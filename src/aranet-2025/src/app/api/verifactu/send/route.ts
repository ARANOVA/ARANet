import { SingleResponse } from '@aranova/aranova-react-ui';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma';
import { logError, logInfo, logWarn } from '@/app/lib/logger';
import { isValidId } from '@/utils';
import { getSession } from '@/app/lib/session';
import { aranet_invoice, aranet_invoice_item } from '@/generated/prisma';
import { UpdateAranetInvoiceDto } from '@/interfaces/dto';
import { sendToVerifactu, signXmlString, verifactuBuildRegistroAltaXML, verifactuCalcHuella, verifactuValidateXmlAgainstXsd } from '@/utils/server/verifactu';
import { aranet_invoice_join_all, aranet_invoice_join_items, aranet_invoice_verifactu } from '@/interfaces';
import z from 'zod';

export async function POST(
  request: NextRequest,
): Promise<
  NextResponse<SingleResponse<aranet_invoice>>
> {
  const cookie = await getSession();
  if (!cookie) {
    return NextResponse.json({
      statusCode: 401,
      error: "Unauthorized",
    }, { status: 401 });
  }

  try {
    const body = await request.json();
    // Validar
    const invoicePrev = body.invoicePrev as aranet_invoice_join_all | null;
    const huellaPrev = body.huellaPrev || invoicePrev?.sent_hash || null;
    // TODO: Valida
    const invoice_items: aranet_invoice_item[] = body.invoice_items || [];

    let data = UpdateAranetInvoiceDto.parse(body);
    const id = data.id;
    if (!id || !isValidId(id)) {
      return NextResponse.json({
        statusCode: 400,
        error: "Bad Request",
      }, { status: 400 });
    }
    // Comprobar que existe
    const existing = await prisma.aranet_invoice.findUnique({
      where: { id },
      include: {
        aranet_client: true,
        aranet_invoice_item: true,
      }
    });
    if (!existing) {
      return NextResponse.json({
        statusCode: 404,
        error: "Not Found",
      }, { status: 404 });
    }
    // No se puede actualizar si está congelada
    // if (existing.freeze_at) {
    //   return NextResponse.json({
    //     statusCode: 400,
    //     error: "Invoice is freezed and cannot be modified",
    //   }, { status: 400 });
    // }
    // No se puede actualizar si ya se ha enviado a Verifactu
    if (existing.sent_at) {
      return NextResponse.json({
        statusCode: 400,
        error: "Invoice is already sent to Verifactu and cannot be modified",
      }, { status: 400 });
    }

    // 1. Congelar factura
    let updateData: Record<string, unknown> = {
      freeze_at: new Date().toISOString(),
      freeze_by: cookie.id,
      updated_at: new Date().toISOString(),
      updated_by: cookie.id,
    }
    delete data.id;
    let invoice = await prisma.aranet_invoice.update({
      where: { id },
      data: updateData,
    });
    data = { ...data, ...updateData };

    // 2. Ya no se puede modificar, calcular huella digital
    const hash = await verifactuCalcHuella({ ...data, invoice_items } as aranet_invoice_join_items, huellaPrev, 'alta');
    if (hash instanceof (Error)) {
      logError(`Error calculating hash for invoice ${id}`);
      return NextResponse.json({
        statusCode: 500,
        error: `Error calculating hash. Error: ${hash.message}`,
        data: null,
      });
    };
    updateData = {
      sent_hash: hash,
      updated_at: new Date().toISOString(),
      updated_by: cookie.id,
    }
    invoice = await prisma.aranet_invoice.update({
      where: { id },
      data: updateData,
    });
    data = { ...data, ...updateData };

    // 3. Generar XML (cliente)
    const invoiceVerifactu: aranet_invoice_verifactu = {
      huellaPrev,
      invoicePrev,
      ...data as aranet_invoice,
      invoice_items: existing?.aranet_invoice_item || [],
      client: existing?.aranet_client || null,
      project: null,
      kind_of_invoice: null,
      payment_condition: null,
      payment_method: null,
      payment_status: null,
      budget: null
    }
    const build = await verifactuBuildRegistroAltaXML(invoiceVerifactu);
    if (build instanceof (Error)) {
      logError(`Error generating XML for invoice ${id}: ${build.message}`);
      return NextResponse.json({
        statusCode: 500,
        error: `Error generating XML: ${build.message}`,
        data: null,
      });
    }

    // 4. Validar XML
    const xml = build.replace('HUELLA_PLACEHOLDER', hash);
    try {
      const validation = await verifactuValidateXmlAgainstXsd(xml, 'alta')
      if (!validation.valid) {
        logError(`Error validating XML for invoice ${id}. Error: ${validation.error}`);
        return NextResponse.json({
          statusCode: 500,
          error: `Error validating XML. Error: ${validation.error}`,
          data: null,
        });
      }
    } catch (error) {
      logError(`Error validating XML for invoice ${id}: ${(error as Error).message}`);
      return NextResponse.json({
        statusCode: 500,
        error: 'Error validating XML',
        data: null,
      });
    }

    // 5. Firmar xml (Server)
    const xmlWithoutDeclaration = xml.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
    const signed = signXmlString(xmlWithoutDeclaration);
    if (signed instanceof Error) {
      logError(`Error signing XML for invoice ${id}: ${signed.message}`);
      return NextResponse.json({
        statusCode: 500,
        error: `Error signing XML. Error: ${signed.message}`,
        data: null,
      });
    }
    updateData = {
      signed_at: new Date().toISOString(),
      signed_by: cookie.id,
      updated_at: new Date().toISOString(),
      updated_by: cookie.id,
    }
    invoice = await prisma.aranet_invoice.update({
      where: { id },
      data: updateData,
    });
    data = { ...data, ...updateData };

    // 6. Enviar a Verifactu (Server)
    const resp = await sendToVerifactu(signed, 'alta');
    if (!resp || resp.EstadoEnvio !== 'OK') {
      logError(`Error sending XML for invoice ${id}: ${JSON.stringify(resp)}`);
      return NextResponse.json({
        statusCode: 500,
        error: 'Error resp XML',
        data: null,
      });
    }

    // 7. Actualizar con el resultado
    const mainError = (resp?.RespuestaLinea || []).length > 0 ? resp?.RespuestaLinea[0].DescripcionErrorRegistro : 'Envio incorrecto';
    updateData = {
      sent_at: new Date().toISOString(),
      sent_by: cookie.id,
      sent_response_code: resp?.EstadoEnvio || 'Correcto',
      sent_response_message: mainError,
      sent_response_data: resp.RespuestaLinea ? JSON.stringify(resp.RespuestaLinea) : null,
      updated_at: new Date().toISOString(),
      updated_by: cookie.id,
    }
    invoice = await prisma.aranet_invoice.update({
      where: { id },
      data: updateData,
    });
    data = { ...data, ...updateData };

    if (invoice) {
      logInfo(`POST /api/verifactu/send: Invoice sended`);
    }

    if (resp?.EstadoEnvio === 'Incorrecto') {
      logWarn(`Warn POST /api/verifactu/send: Sent incorrect for invoice ${id}. Error: ${JSON.stringify(resp?.RespuestaLinea || {})}`);
      return NextResponse.json({
        statusCode: 500,
        error: `Envio incorrecto. ${mainError}`,
      }, { status: 400 });
    }

    return NextResponse.json({
      statusCode: 201,
      data: invoice,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logWarn(`Validation errors POST /api/verifactu/send for invoice: ${err.issues.map((e: any) => `[${e.path.join(".")}] ${e.message}`).join("; ")}`);
    }
    if (err.toString().indexOf('No record was found for an update') > -1) {
      logWarn(`Warn POST /api/verifactu/send: No record was found for an update`);
      return NextResponse.json({
        statusCode: 400,
        error: "Bad Request",
      }, { status: 400 });
    }
    logError(`Error POST /api/verifactu/send: ${err}`);
    return NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  }
}
