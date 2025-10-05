import { aranet_invoice_verifactu } from "@/interfaces"
import { toDateIso, toDateString } from "@/utils/date.utils";
import { round2 } from "@/utils/number.utils";
import { ID_VERSION_REGISTRO_ALTA, NSS, toInvoiceType } from "@/utils/verifactu.utils";
import { create } from "xmlbuilder2";

export const buildXmlConsulta = (
  year: number,
  month: number,
  onlyBody = true,
): string | Error => {
  // 1. Comprobaciones iniciales
  if (!process.env.COMPANY_CIF || !process.env.COMPANY_FULLNAME) {
    return new Error("Faltan valores de entorno de la empresa");
  }

  // 2. Build xml
  const root = create({ version: '1.0', encoding: 'UTF-8' });
  if (!onlyBody) {
    root.ele("env:Envelope", {
        ...NSS.consulta,
      })
      .ele('env:Header').up()
    .ele('env:Body');
  }
  root.ele('sfLRC:ConsultaFactuSistemaFacturacion')
    .ele(`sfLRC:Cabecera`)
      .ele("sf:IDVersion").txt(ID_VERSION_REGISTRO_ALTA).up()
      .ele("sf:ObligadoEmision")
        .ele("sf:NombreRazon").txt(process.env.COMPANY_FULLNAME).up()
        .ele("sf:NIF").txt(process.env.COMPANY_CIF).up()
      .up()
    .up()
  .ele('sfLRC:FiltroConsulta')
    .ele('sfLRC:PeriodoImputacion')
      .ele('sf:Ejercicio').txt(year.toString()).up()
      .ele('sf:Periodo').txt(month.toString().padStart(2, "0")).up()
    .up()
  .up();
  if (!onlyBody) {
    root.up().up().up();
  }
  return root.end({ prettyPrint: false });
}

export const buildXmlRegistro = (
  invoice: aranet_invoice_verifactu,
  onlyBody = true,
): string | Error => {

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

  if (!process.env.DEV_COMPANY_NAME || !process.env.DEV_COMPANY_CIF) {
    return new Error("Debe identificarse el sistema informático emisor");
  }

  const prefix = invoice.invoice_prefix || '';

  // 2. Build xml
  const root = create({ version: '1.0', encoding: 'UTF-8' });
  if (!onlyBody) {
    root.ele("env:Envelope", {
        ...NSS.consulta,
      })
      .ele('env:Header').up()
    .ele('env:Body');
  }
  
  const body = root.ele('sfLR:RegFactuSistemaFacturacion')
    .ele(`sfLR:Cabecera`)
      .ele("sf:ObligadoEmision")
        .ele("sf:NombreRazon").txt(process.env.COMPANY_FULLNAME).up()
        .ele("sf:NIF").txt(process.env.COMPANY_CIF).up()
      .up()
    .up()

    .ele('sfLR:RegistroFactura')
      .ele("sf:RegistroAlta")
        .ele("sf:IDVersion").txt(ID_VERSION_REGISTRO_ALTA).up()
        .ele("sf:IDFactura")
          .ele("sf:IDEmisorFactura").txt(process.env.COMPANY_CIF).up()
          .ele("sf:NumSerieFactura").txt(prefix + invoice.invoice_number).up()
          .ele("sf:FechaExpedicionFactura").txt(invoiceDate).up()
        .up();

  // RefExterna (optional)

  body.ele("sf:NombreRazonEmisor").txt(process.env.COMPANY_FULLNAME).up();

  // TipoFactura (required)
  const invoiceType = toInvoiceType(invoice.invoice_kind_of_invoice_id);
  body.ele("sf:TipoFactura").txt(invoiceType).up();

  // TipoRectificación (optional)
  if (invoice.invoice_prefix?.startsWith('AB')) {
    const invoiceRectType = toInvoiceType(invoice.invoice_kind_of_invoice_id);
    body.ele("sf:TipoRectificativa").txt(invoiceRectType).up();
    // TODO: Facturas rectificadas
    /*
    $facturasRectificadas = $doc->createElementNS(self::SF_NAMESPACE, 'sf:FacturasRectificadas');
    foreach ($rectData['rectified'] as $rect) {
        $idFacturaRectificada = $doc->createElementNS(self::SF_NAMESPACE, 'sf:IDFacturaRectificada');
        $idFacturaRectificada->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:IDEmisorFactura', (string) $rect['issuerNif']));
        $idFacturaRectificada->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:NumSerieFactura', (string) $rect['seriesNumber']));
        $idFacturaRectificada->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:FechaExpedicionFactura', (string) $rect['issueDate']));
        $facturasRectificadas->appendChild($idFacturaRectificada);
    }
    $root->appendChild($facturasRectificadas);
    */
  }

  // TODO: FacturasSustituidas (optional)
  /*
  if (!empty($rectData['substituted'])) {
      $facturasSustituidas = $doc->createElementNS(self::SF_NAMESPACE, 'sf:FacturasSustituidas');
      foreach ($rectData['substituted'] as $subst) {
          $idFacturaSustituida = $doc->createElementNS(self::SF_NAMESPACE, 'sf:IDFacturaSustituida');
          $idFacturaSustituida->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:IDEmisorFactura', (string) $subst['issuerNif']));
          $idFacturaSustituida->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:NumSerieFactura', (string) $subst['seriesNumber']));
          $idFacturaSustituida->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:FechaExpedicionFactura', (string) $subst['issueDate']));
          $facturasSustituidas->appendChild($idFacturaSustituida);
      }
      $root->appendChild($facturasSustituidas);
  }
  */

  // TODO: ImporteRectificacion (optional)
  /*
  $rectBreakdown = $invoice->getRectificationBreakdown();
  if ($rectBreakdown) {
      $importeRectificacion = $doc->createElementNS(self::SF_NAMESPACE, 'sf:ImporteRectificacion');
      $importeRectificacion->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:BaseRectificada', (string) number_format((float) $rectBreakdown->rectifiedBase, 2, '.', '')));
      $importeRectificacion->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:CuotaRectificada', (string) number_format((float) $rectBreakdown->rectifiedTax, 2, '.', '')));
      if (!is_null($rectBreakdown->rectifiedEquivalenceSurcharge)) {
          $importeRectificacion->appendChild($doc->createElementNS(self::SF_NAMESPACE, 'sf:CuotaRecargoRectificado', (string) number_format((float) $rectBreakdown->rectifiedEquivalenceSurcharge, 2, '.', '')));
      }
      $root->appendChild($importeRectificacion);
  }
  */

  body.ele("sf:DescripcionOperacion").txt(invoice.invoice_title || '').up();

  body.ele("sf:Destinatarios")
    .ele("sf:IDDestinatario")
      .ele("sf:NombreRazon").txt(invoice.client?.client_company_name).up()
      .ele("sf:NIF").txt(invoice.client?.client_cif).up()
    .up()
  .up();

  // Items
  let total_items_tax_amount = 0;
  let total_items_base_amount = 0;
  console.log({invoice_item: invoice.invoice_items})
  if (invoice.invoice_items || [].length > 0) {
    const desglose = body.ele("sf:Desglose");
    (invoice.invoice_items || []).forEach((d) => {
      if (d.item_cost === 0 || d.item_cost === null) return;
      const tax_amount = round2(((d.item_tax_rate || 0) / 100) * d.item_cost);
      total_items_tax_amount += tax_amount;
      total_items_base_amount += d.item_cost;
      const detalle = desglose.ele("sf:DetalleDesglose");
      detalle.ele("sf:ClaveRegimen").txt('01').up(); // TODO
      detalle.ele("sf:CalificacionOperacion").txt('S1').up(); // TODO
      detalle.ele("sf:TipoImpositivo").txt((d.item_tax_rate || 0).toFixed(0)).up(); // TODO
      detalle.ele("sf:BaseImponibleOimporteNoSujeto").txt(round2(d.item_cost).toFixed(2)).up();
      detalle.ele("sf:CuotaRepercutida").txt(round2(tax_amount).toFixed(2)).up();
      detalle.up();
    });
    desglose.up();
  }

  if (total_items_base_amount !== invoice.invoice_total_amount) {
    return new Error(`No coinciden los importes totales. ${total_items_base_amount} !== ${invoice.invoice_total_amount}`);
  }

  body.ele("sf:CuotaTotal").txt(total_items_tax_amount.toFixed(2)).up();
  body.ele("sf:ImporteTotal").txt(round2(total_items_tax_amount + invoice.invoice_total_amount).toFixed(2)).up();

  if (invoice.huellaPrev && invoice.invoicePrev) {
    // Get prev invoice
    const prefix = invoice.invoicePrev.invoice_prefix || '';
    body.ele("sf:Encadenamiento")
      .ele("sf:RegistroAnterior")
        .ele("sf:IDEmisorFactura").txt(process.env.COMPANY_CIF || '').up()
        .ele("sf:NumSerieFactura").txt(prefix + invoice.invoicePrev.invoice_number).up()
        .ele("sf:FechaExpedicionFactura").txt(toDateString(invoice.invoicePrev.invoice_date)).up()
        .ele("sf:Huella").txt(invoice.huellaPrev).up()
      .up()
    .up();
  } else {
    body.ele("sf:Encadenamiento")
      .ele("sf:PrimerRegistro").txt(invoice.huellaPrev ? 'N' : 'S').up()
    .up();
  }

  // SistemaInformatico (required)

  body.ele("sf:SistemaInformatico")
    .ele("sf:NombreRazon").txt(process.env.DEV_COMPANY_NAME || '').up()
    .ele("sf:NIF").txt(process.env.DEV_COMPANY_CIF || '').up()
    .ele("sf:NombreSistemaInformatico").txt(process.env.DEV_APP_NAME || '').up()
    .ele("sf:IdSistemaInformatico").txt(process.env.DEV_APP_ID || '').up()
    .ele("sf:Version").txt(process.env.DEV_APP_VERSION || '1.0.0').up()
    .ele("sf:NumeroInstalacion").txt(process.env.DEV_APP_LOCALID || '1').up()
    .ele("sf:TipoUsoPosibleSoloVerifactu").txt("S").up()
    .ele("sf:TipoUsoPosibleMultiOT").txt("N").up()
    .ele("sf:IndicadorMultiplesOT").txt("N").up()
  .up();

  body.ele("sf:FechaHoraHusoGenRegistro").txt(toDateIso(invoice.created_at)).up();
  body.ele("sf:TipoHuella").txt('01').up();
  body.ele("sf:Huella").txt('HUELLA_PLACEHOLDER').up();
  if (!onlyBody) {
    body.up().up().up();
  }
  return body.end({ prettyPrint: false });
}