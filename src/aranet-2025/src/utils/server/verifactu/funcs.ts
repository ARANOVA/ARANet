import os from 'os';
import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import crypto from 'crypto';
import { aranet_invoice_verifactu } from "@/interfaces";
import { round2, toDateIso, toDateString, toInvoiceType } from "./utils";
import { create } from "xmlbuilder2";
import { ID_VERSION_REGISTRO_ALTA, NSS } from "./consts";
import { ClientSSLSecurityPFX, createClientAsync } from "soap";

// Pre
export const sendToVerifactu = async (xml: string): Promise<Error | void> => {
  console.log({xml})
  const CERT_PATH = path.join(__dirname, '..', '..', '..', '..', 'certificados', '29112043T_PABLO_SANCHEZ__R__B99078248_.p12').replace('/ROOT/', './');
  if (!fs.existsSync(CERT_PATH)) {
    return new Error('Certificado not found');
  }
  const CERT_PASSPHRASE = process.env.CERT_PASSPHRASE || '';
  if (!CERT_PASSPHRASE) {
    return new Error('Needed env variable CERT_PASSPHRASE');
  }

  if (!process.env.VERIFACTU_WSDL_URL || !process.env.VERIFACTU_SOAP_URL) {
    return new Error('Missing VERIFACTU_WSDL_URL or VERIFACTU_SOAP_URL');
  }

  // Client options for the SOAP call
  const options = {
    wsdl_options: {
      disableCache: true, // Optional SOAP client options
    },
  };

  const client = await createClientAsync(
    process.env.VERIFACTU_WSDL_URL,
    options,
    process.env.VERIFACTU_SOAP_URL,
  );

  client.setSecurity(
    new ClientSSLSecurityPFX(
      CERT_PATH,
      CERT_PASSPHRASE,
    ),
  );

  client.setEndpoint(process.env.VERIFACTU_SOAP_URL);
  // Enviar mensaje
  const resp = client.RegFactuSistemaFacturacion({ xml }, (err: any, result: any, rawResponse: any, soapHeader: any, rawRequest: any) => {
    console.log({err, result, rawResponse, soapHeader, rawRequest});
    if (err) {
      console.error("SOAP error:", err);
      return;
    }
    console.log("Result:", result);
    console.log("Raw Request:", rawRequest);
    console.log("Raw Response:", rawResponse);
  });
  console.log(resp);
}

// 0. Consulta registros
export const verifactuBuildConsultaRegistrosXML = async(
  year: number,
  month: number,
): Promise<string | Error> => {
  // 1. Comprobaciones iniciales
  if (!process.env.COMPANY_CIF || !process.env.COMPANY_FULLNAME) {
    return new Error("Faltan valores de entorno de la empresa");
  }

  // 2. Generar XML request
  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele("soapenv:Envelope", {
        ...NSS.consulta,
      })
      .ele('soapenv:Header').up()
      .ele('soapenv:Body')
        .ele('con:ConsultaFactuSistemaFacturacion')
            .ele(`con:Cabecera`)
              .ele("sum1:IDVersion").txt(ID_VERSION_REGISTRO_ALTA).up()
              .ele("sum1:ObligadoEmision")
                .ele("sum1:NombreRazon").txt(process.env.COMPANY_FULLNAME).up()
                .ele("sum1:NIF").txt(process.env.COMPANY_CIF).up()
              .up()
              // .ele('sum1:Destinatario')
              //   .ele("sum1:NombreRazon").txt('KK, S.L.L.').up()
              //   .ele("sum1:NIF").txt('A99051047').up()
              // .up()
            .up()
          .ele('con:FiltroConsulta')
            .ele('con:PeriodoImputacion')
              .ele('sum1:Ejercicio').txt(year.toString()).up()
              .ele('sum1:Periodo').txt(month.toString().padStart(2, "0")).up()
            .up()
          .up()
        .up()
      .up()
    .up();
    return root.end({ prettyPrint: true });
}

// 1. Generar XML
export const verifactuBuildRegistroAltaXML = async (
  invoice: aranet_invoice_verifactu,
): Promise<string | Error> => {
  // 1. Comprobaciones iniciales
  if (!process.env.COMPANY_CIF || !process.env.COMPANY_FULLNAME) {
    return new Error("Faltan valores de entorno de la empresa");
  }

  if (!invoice.client?.client_company_name || !invoice.client?.client_cif) {
    return new Error("Faltan valores de entorno del cliente");
  }

  if (!invoice.invoice_number) {
    return new Error("La factura debe tener un número válido");
  }

  if (!invoice.invoice_total_amount) {
    return new Error("La factura debe tener un importe total válido");
  }

  if (!invoice.invoice_tax_rate) {
    return new Error("La factura debe tener un valor impositivo válido");
  }

  if (!invoice.created_at) {
    return new Error("La factura debe tener una fecha de creación");
  }

  const invoiceDate = toDateString(invoice.invoice_date);
  if (!invoiceDate) {
    return new Error("La factura debe que tener fecha de emisión");
  }

  const prefix = invoice.invoice_prefix || '';
  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele("soapenv:Envelope", {
        ...NSS.alta,
      })
      .ele('soapenv:Header').up()
      .ele('soapenv:Body')
        .ele('sum:RegFactuSistemaFacturacion')
          .ele(`sum1:Cabecera`)
            .ele("sum1:ObligadoEmision")
              .ele("sum1:NombreRazon").txt(process.env.COMPANY_FULLNAME).up()
              .ele("sum1:NIF").txt(process.env.COMPANY_CIF).up()
            .up()
          .up()

          .ele('sum:RegistroFactura')
            .ele("sum:RegistroAlta")
              .ele("sum1:IDVersion").txt(ID_VERSION_REGISTRO_ALTA).up();

  const idFactura = root.ele("sum1:IDFactura")
    .ele("sum1:IDEmisorFactura").txt(process.env.COMPANY_CIF).up()
    .ele("sum1:NumSerieFactura").txt(prefix + invoice.invoice_number).up()
    .ele("sum1:FechaExpedicionFactura").txt(invoiceDate).up()
  .up();

  root.ele("sum1:NombreRazonEmisor").txt(process.env.COMPANY_FULLNAME).up()
    // <Subsanacion>S</Subsanacion>
    // <RechazoPrevio>X</RechazoPrevio>
    .ele("sum1:TipoFactura").txt(toInvoiceType(invoice.invoice_kind_of_invoice_id)).up()
    // <TipoRectificativa/>
    // <FacturasRectificadas/>
    // <FacturasSustituidas/>
    // <ImporteRectificacion/>
    // <FechaOperacion/>
    .ele("sum1:DescripcionOperacion").txt(invoice.invoice_title || '').up();

  root.ele("sum1:Destinatarios")
    .ele("sum1:IDDestinatario")
      .ele("sum1:NombreRazon").txt(invoice.client?.client_company_name).up()
      .ele("sum1:NIF").txt(invoice.client?.client_cif).up()
    .up()
  .up();

  let total_items_tax_amount = 0;
  let total_items_base_amount = 0;
  if (invoice.invoice_item || [].length > 0) {
    const desglose = root.ele("sum1:Desglose");
    (invoice.invoice_item || []).forEach((d) => {
      if (d.item_cost === 0 || d.item_cost === null) return;
      const tax_amount = round2(((d.item_tax_rate || 0) / 100) * d.item_cost);
      total_items_tax_amount += tax_amount;
      total_items_base_amount += d.item_cost;
      const detalle = desglose.ele("sum1:DetalleDesglose");
      detalle.ele("sum1:ClaveRegimen").txt('01').up(); // TODO
      detalle.ele("sum1:CalificacionOperacion").txt('S1').up(); // TODO
      detalle.ele("sum1:TipoImpositivo").txt((d.item_tax_rate || 0).toFixed(0)).up(); // TODO
      detalle.ele("sum1:BaseImponibleOimporteNoSujeto").txt(round2(d.item_cost).toFixed(2)).up();
      detalle.ele("sum1:CuotaRepercutida").txt(round2(tax_amount).toFixed(2)).up();
      detalle.up();
    });
    desglose.up();
  }

  if (total_items_base_amount !== invoice.invoice_total_amount) {
    return new Error(`No coinciden los importes totales. ${total_items_base_amount} !== ${invoice.invoice_total_amount}`);
  }

  root.ele("sum1:CuotaTotal").txt(total_items_tax_amount.toFixed(2)).up();
  root.ele("sum1:ImporteTotal").txt(round2(total_items_tax_amount + invoice.invoice_total_amount).toFixed(2)).up();

  const huellaPrev = invoice.huellaPrev;
  root.ele("sum1:Encadenamiento")
    .ele("sum1:PrimerRegistro").txt(huellaPrev ? 'N' : 'S').up();
  if (huellaPrev) {
    root.ele("sum1:RegistroAnterior")
      .ele("sum1:IDEmisorFactura").txt(huellaPrev ? process.env.COMPANY_CIF : '').up()
      .ele("sum1:NumSerieFactura").txt(huellaPrev ? prefix + invoice.invoice_number : '').up()
      .ele("sum1:FechaExpedicionFactura").txt(huellaPrev ? invoiceDate : '').up()
      .ele("sum1:Huella").txt(huellaPrev || '').up()
    .up();
  }
  root.up();

  if (process.env.DEV_COMPANY_NAME && process.env.DEV_COMPANY_CIF) {
    root.ele("sum1:SistemaInformatico")
      .ele("sum1:NombreRazon").txt(process.env.DEV_COMPANY_NAME).up()
      .ele("sum1:NIF").txt(process.env.DEV_COMPANY_CIF).up()
      .ele("sum1:NombreSistemaInformatico").txt(process.env.DEV_APP_NAME || '').up()
      .ele("sum1:IdSistemaInformatico").txt(process.env.DEV_APP_ID || '').up()
      .ele("sum1:Version").txt(process.env.DEV_APP_VERSION || '1.0.0').up()
      .ele("sum1:NumeroInstalacion").txt(process.env.DEV_APP_LOCALID || '1').up()
      .ele("sum1:TipoUsoPosibleSoloVerifactu").txt("N").up()
      .ele("sum1:TipoUsoPosibleMultiOT").txt("S").up()
      .ele("sum1:IndicadorMultiplesOT").txt("S").up()
    .up();
  }

  root.ele("sum1:FechaHoraHusoGenRegistro").txt(toDateIso(invoice.created_at)).up();
  root.ele("sum1:TipoHuella").txt('01').up();
  root.ele("sum1:Huella").txt('HUELLA_PLACEHOLDER').up();
  root.up().up();

  return root.end({ prettyPrint: true });
}


// --- 2) calcular la huella (SHA-256) ---
// IMPORTANTE: el "string de entrada" y el orden de concatenación debe seguir
// exactamente el documento AEAT "Algoritmo de cálculo de la huella".
// Aquí hay un ejemplo ilustrativo: concatena campos y la huella anterior si existe.
export const verifactuCalcHuella = async (invoice: aranet_invoice_verifactu): Promise<Error | string> => {
  // --- construye la cadena tal como especifique AEAT (ejemplo simplificado) ---
  const invoiceDate = toDateString(invoice.invoice_date);
  if (!invoiceDate) {
    return new Error("La factura debe que tener fecha de emisión");
  }

  const prefix = invoice.invoice_prefix || '';
  if (!invoice.invoice_total_amount) {
    return new Error("Debe tener un importe total válido");
  }

  const huellaPrev = invoice.huellaPrev;

  const input = `${prefix}|${invoice.invoice_number}|${invoiceDate}|${round2(invoice.invoice_total_amount)}` + (huellaPrev ? `|${huellaPrev}` : '');
  const hash = crypto.createHash('sha256').update(input, 'utf8').digest('hex').toUpperCase();
  return hash;
}

// --- 3) validar contra XSD (descargado de AEAT) ---
export const verifactuValidateXmlAgainstXsd = async (
  xmlString: string,
  xsdPath: string,
  xmlns: Record<string, string>,
  rootTag: string,
): Promise<{ valid: boolean; error?: string; }> => {
  // Crear ruta temporal
  const tempDir = os.tmpdir();
  const tempXmlPath = path.join(tempDir, `temp_${Date.now()}.xml`);

  // Dejar sólo el body
  const regex = new RegExp(`<${rootTag}>([\\s\\S]*?)<\\/${rootTag}>`);
  const match = xmlString.match(regex);
  if (!match || !match[1]) {
    return { valid: false, error: 'Can\'t extract body'}
  }
  const bodyContent = match[1].trim();

  // Construimos el string del nodo raíz con los xmlns
  const xmlnsString = Object.entries(xmlns)
    .map(([prefix, url]) => `${prefix}="${url}"`)
    .join(" ");

  // Creamos un XML válido solo con el Body y los namespaces
  const bodyXml = `<${rootTag} ${xmlnsString}>
    ${bodyContent}
  </${rootTag}>`;
    console.log({bodyXml, xmlString})

  
  // Escribir el XML en un archivo temporal
  fs.writeFileSync(tempXmlPath, bodyXml, { encoding: 'utf-8' });

  return new Promise((resolve, reject) => {
    exec(`xmllint --noout --nonet --schema ${xsdPath} ${tempXmlPath}`, (err, stdout, stderr) => {
      // Borrar
      // fs.unlinkSync(tempXmlPath);
      if (err) reject({ valid: false, error: stderr });
      else resolve({ valid: true });
    });
  });
}


// --- 4) generar QR dataURL ---
// export const verifactuGenQr = async (invoice: aranet_invoice_join_all): Error | any => {
//   // La URL o contenido exacto del QR viene definido por la AEAT (ver especificación QR).
//   if (!invoice.client?.client_cif) {
//     return new Error("El cliente no tiene CIF");
//   }

//   const invoiceDate = toDateString(invoice.invoice_date);
//   if (!invoiceDate) {
//     return new Error("La factura debe que tener fecha de emisión");
//   }
//   const aux = invoice.invoice_prefix || '';
//   const prefix = aux.endsWith("-") ? aux.slice(0, -1) : aux;

//   const qrContent = `https://sede.agenciatributaria.gob.es/cotejo?NIF=${invoice.client?.client_cif}&S=${prefix}&N=${invoice.invoice_number}&F=${invoiceDate}&I=${invoice.invoice_total_amount.toFixed(2)}`;
//   return QRCode.toDataURL(qrContent, { errorCorrectionLevel: 'M' });
// }
