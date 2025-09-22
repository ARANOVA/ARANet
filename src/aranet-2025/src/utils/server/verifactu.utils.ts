'use server';

import os from 'os';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import soap from 'soap';
import { aranet_invoice_join_all } from '@/interfaces';
import { create } from 'xmlbuilder2';
import { exec } from "child_process";

import QRCode from "qrcode";

/**
 * Tipo de factura según Verifactu / Suministro LR.
 */
export enum TipoFactura {
  /** Factura completa / normal */
  F1 = 'F1',
  /** Factura rectificativa */
  F2 = 'F2',
  /** Factura simplificada */
  F3 = 'F3',
  /** Factura recapitulativa / resumen mensual */
  F4 = 'F4',
  /** Otro tipo especial (p.ej. factura interna o de ajuste) */
  F5 = 'F5',
};

const tipoFactura = (tipoId: number | null): string => {
  switch (tipoId) {
    case 1:
      return TipoFactura.F1;
    case 5:
      return TipoFactura.F5;
    // No usadas
    // case 4:
    //   return TipoFactura.F2;
    // case 3:
    //   return TipoFactura.F1;
    // case 4:
    //   return TipoFactura.F4;
    default:
      return TipoFactura.F1;
  }
}

const dateToEngFormat = (raw: Date | string): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  }
  return date
    ? date.toISOString().split('T')[0]
    : '';
}

const dateToIso = (raw: Date | string): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  }
  return date
    ? date.toISOString()
    : '';
}

export const verifactuBuildRegistroAltaXML = async (
  invoice: aranet_invoice_join_all,
  huellaPrev: string | null,
): Promise<string | Error> => {
  // 1. Comprobaciones iniciales
  if (!process.env.COMPANY_CIF || !process.env.COMPANY_FULLNAME) {
    return new Error("Faltan valores de entorno de la empresa");
  }

  if (!invoice.aranet_client?.client_company_name || !invoice.aranet_client?.client_cif) {
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

  const invoiceDate = dateToEngFormat(invoice.invoice_date);
  if (!invoiceDate) {
    return new Error("La factura debe que tener fecha de emisión");
  }

  const prefix = invoice.invoice_prefix || '';

  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele("soapenv:Envelope", {
      "xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
      "xmlns:sum":
        "https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroLR.xsd",
      "xmlns:sum1":
        "https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd",
      "xmlns:xd": "http://www.w3.org/2000/09/xmldsig#",
    })
      .ele('soapenv:Header').up()
      .ele('soapenv:Body')
        .ele("sum:RegFactuSistemaFacturacion")
          .ele("sum:Cabecera")
            .ele("sum1:ObligadoEmision")
              .ele('sum1:NombreRazon').txt(process.env.COMPANY_FULLNAME).up()
              .ele('sum1:NIF').txt(process.env.COMPANY_CIF).up()
            .up()
            .up()
            .ele("sum:RegistroFactura")
              .ele("sum1:RegistroAlta");
  root.ele("sum1:IDVersion").txt("1.0").up();

  const idFactura = root.ele("sum1:IDFactura")
    .ele("sum1:IDEmisorFactura").txt(process.env.COMPANY_CIF).up()
    .ele("sum1:NumSerieFactura").txt(prefix + invoice.invoice_number).up()
    .ele("sum1:FechaExpedicionFactura").txt(invoiceDate).up()
  .up();

  root.ele("sum1:NombreRazonEmisor").txt(process.env.COMPANY_FULLNAME).up();
  root.ele("sum1:TipoFactura").txt(tipoFactura(invoice.invoice_kind_of_invoice_id)).up();
  root.ele("sum1:DescripcionOperacion").txt(process.env.COMPANY_CIF).up();

  root.ele("sum1:Destinatarios")
    .ele("sum1:IDDestinatario")
      .ele("sum1:NombreRazon").txt(invoice.aranet_client?.client_company_name).up()
      .ele("sum1:NIF").txt(invoice.aranet_client?.client_cif).up()
    .up()
  .up();

  let total_items_tax_amount = 0;
  let total_items_base_amount = 0;
  if (invoice.aranet_invoice_item || [].length > 0) {
    const desglose = root.ele("sum1:Desglose");
    (invoice.aranet_invoice_item || []).forEach((d) => {
      if (d.item_cost === 0 || d.item_cost === null) return;
      const tax_amount = Math.round((((d.item_tax_rate || 0) / 100) * d.item_cost)*100) / 100;
      total_items_tax_amount += tax_amount;
      total_items_base_amount += d.item_cost;
      const detalle = desglose.ele("sum1:DetalleDesglose");
      detalle.ele("sum1:ClaveRegimen").txt('01').up(); // TODO
      detalle.ele("sum1:CalificacionOperacion").txt('S1').up(); // TODO
      detalle.ele("sum1:TipoImpositivo").txt((d.item_tax_rate || 0).toFixed(0)).up(); // TODO
      detalle.ele("sum1:BaseImponibleOimporteNoSujeto").txt(d.item_cost.toFixed(2)).up();
      detalle.ele("sum1:CuotaRepercutida").txt((tax_amount).toFixed(2)).up();
      detalle.up();
    });
    desglose.up();
  }

  if (total_items_base_amount !== invoice.invoice_total_amount) {
    return new Error(`No coinciden los importes totales. ${total_items_base_amount} !== ${invoice.invoice_total_amount}`);
  }

  root.ele("sum1:CuotaTotal").txt(total_items_tax_amount.toFixed(2)).up();
  root.ele("sum1:ImporteTotal").txt(invoice.invoice_total_amount.toFixed(2)).up();

  if (huellaPrev) {
    const encadenamiento = root.ele("sum1:Encadenamiento").ele("sum1:RegistroAnterior");
    encadenamiento.ele("sum1:IDEmisorFactura").txt(process.env.COMPANY_CIF).up();
    encadenamiento.ele("sum1:NumSerieFactura").txt(prefix + invoice.invoice_number).up();
    encadenamiento
      .ele("sum1:FechaExpedicionFactura")
      .txt(invoiceDate)
      .up();
    encadenamiento.ele("sum1:Huella").txt(huellaPrev).up();
    encadenamiento.up().up();
  }

  if (process.env.DEV_COMPANY_NAME && process.env.DEV_COMPANY_NIF) {
    const sistema = root.ele("sum1:SistemaInformatico");
    sistema.ele("sum1:NombreRazon").txt(process.env.DEV_COMPANY_NAME).up();
    sistema.ele("sum1:NIF").txt(process.env.DEV_COMPANY_NIF).up();
    sistema.ele("sum1:NombreSistemaInformatico").txt(process.env.DEV_APP_NAME || '').up();
    sistema.ele("sum1:IdSistemaInformatico").txt(process.env.DEV_APP_ID || '').up();
    sistema.ele("sum1:Version").txt(process.env.DEV_APP_VERSION || '1.0.0').up();
    sistema.ele("sum1:NumeroInstalacion").txt(process.env.DEV_APP_LOCALID || '1').up();
    sistema.ele("sum1:TipoUsoPosibleSoloVerifactu").txt("N").up();
    sistema.ele("sum1:TipoUsoPosibleMultiOT").txt("S").up();
    sistema.ele("sum1:IndicadorMultiplesOT").txt("S").up();
    sistema.up();
  }

  root.ele("sum1:FechaHoraHusoGenRegistro").txt(dateToIso(invoice.created_at)).up();
  root.ele("sum1:TipoHuella").txt('01').up();
  root.ele("sum1:Huella").txt('HUELLA_PLACEHOLDER').up();

  return root.end({ prettyPrint: true });
}

// --- 2) calcular la huella (SHA-256) ---
// IMPORTANTE: el "string de entrada" y el orden de concatenación debe seguir
// exactamente el documento AEAT "Algoritmo de cálculo de la huella".
// Aquí hay un ejemplo ilustrativo: concatena campos y la huella anterior si existe.
export const verifactuCalcHuella = async (invoice: aranet_invoice_join_all, huellaPrev: string | null): Promise<Error | string> => {
  // --- construye la cadena tal como especifique AEAT (ejemplo simplificado) ---
  const invoiceDate = dateToEngFormat(invoice.invoice_date);
  if (!invoiceDate) {
    return new Error("La factura debe que tener fecha de emisión");
  }

  const prefix = invoice.invoice_prefix || '';
  if (!invoice.invoice_total_amount) {
    return new Error("Debe tener un importe total válido");
  }

  const input = `${prefix}|${invoice.invoice_number}|${invoiceDate}|${invoice.invoice_total_amount.toFixed(2)}` + (huellaPrev ? `|${huellaPrev}` : '');
  const hash = crypto.createHash('sha256').update(input, 'utf8').digest('hex').toUpperCase();
  return hash;
}

// --- 3) validar contra XSD (descargado de AEAT) ---
export const verifactuValidateXmlAgainstXsd = async (
  xmlString: string,
  xsdPath: string,
): Promise<{ valid: boolean; error?: string; }> => {
  // Crear ruta temporal
  const tempDir = os.tmpdir();
  const tempXmlPath = path.join(tempDir, `temp_${Date.now()}.xml`);

  // Escribir el XML en un archivo temporal
  fs.writeFileSync(tempXmlPath, xmlString, { encoding: 'utf-8' });

  return new Promise((resolve, reject) => {
    exec(`xmllint --noout --schema ${xsdPath} ${tempXmlPath}`, (err, stdout, stderr) => {
      if (err) reject({ valid: true, error: stderr });
      else resolve({ valid: true });
    });
  });
}

// --- 4) generar QR dataURL ---
export const verifactuGenQr = async (invoice: aranet_invoice_join_all): Error | any => {
  // La URL o contenido exacto del QR viene definido por la AEAT (ver especificación QR).
  if (!invoice.aranet_client?.client_cif) {
    return new Error("El cliente no tiene CIF");
  }

  const invoiceDate = dateToEngFormat(invoice.invoice_date);
  if (!invoiceDate) {
    return new Error("La factura debe que tener fecha de emisión");
  }
  const aux = invoice.invoice_prefix || '';
  const prefix = aux.endsWith("-") ? aux.slice(0, -1) : aux;

  const qrContent = `https://sede.agenciatributaria.gob.es/cotejo?NIF=${invoice.aranet_client?.client_cif}&S=${prefix}&N=${invoice.invoice_number}&F=${invoiceDate}&I=${invoice.invoice_total_amount.toFixed(2)}`;
  return QRCode.toDataURL(qrContent, { errorCorrectionLevel: 'M' });
}

// --- flujo ---
export const verifactuFlow = async(invoice: aranet_invoice_join_all): Promise<Error | null> => {
  // obtener huella anterior desde tu DB (si aplica)
  const huellaPrev = null; // o 'ABCDEF...' si existe

  // calcular huella actual según el algoritmo AEAT
  const huella = await verifactuCalcHuella(invoice, huellaPrev);
  if (huella instanceof(Error)) {
    // TODO
    return huella;
  }

  // construir XML y reemplazar placeholder por huella real
  const build = await verifactuBuildRegistroAltaXML(invoice, huellaPrev);
  if (build instanceof(Error)) {
    // TODO
    return build;
  }
  const xml = build.replace('HUELLA_PLACEHOLDER', huella);

  // validar contra XSD (descárgate el XSD oficial y pásalo aquí)
  const xsdPath = path.join(__dirname, '..', '..', 'verifactu-dev', 'xsd', 'SuministroInformacion.xsd').replace('/ROOT/', './');
  const validation = await verifactuValidateXmlAgainstXsd(xml, xsdPath);
  if (!validation.valid) {
    console.error('XML no válido:', validation.error);
    return new Error(`XML no válido: ${validation.error}`);
  }

  // generar QR (dataURL para incrustar en PDF o imagen)
  const qrDataUrl = await verifactuGenQr(invoice);
  console.log('QR dataURL (puedes convertir a PNG):', qrDataUrl.slice(0, 80), '...');

  // listo: xml contiene el registro correcto con huella; si tienes que enviar,
  // lo envías dentro del SOAP al endpoint AEAT con certificado cliente.
  // Ejemplo de envío (si procede):
  const wsdlPath = path.join(__dirname, '..', '..', 'verifactu-dev', 'wsdl', 'SistemaFacturacion.wsdl');
  // o
  const wsdlUrl = 'https://prewww2.aeat.es/static_files/common/internet/dep/aplicaciones/es/aeat/tikeV1.0/cont/ws/SistemaFacturacion.wsdl';
  // const certificado = fs.readFileSync(path.join(__dirname, '..', 'certificados', './29112043T_PABLO_SANCHEZ__R__B99078248_.p12');
  // const agente = new https.Agent({
  //   pfx: certificado,
  //   passphrase: process.env.CERT_PASSWORD, // la contraseña del .p12 o .pfx
  //   rejectUnauthorized: true, // asegura validación de certificados AEAT
  // });

  // const response = await axios.post(
  //   (wsdlPath || wsdlUrl) + 'RegFactuSistemaFacturacion',
  //   xml,
  //   {
  //     httpsAgent: agente,
  //     headers: {
  //       "Content-Type": "text/xml; charset=utf-8",
  //       SOAPAction: "",
  //     },
  //   }
  // );

  const cert = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', '..', 'certificados', './aranova.crt'));
  const key = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', '..', 'certificados', './aranova.key'));
  
  // Crear cliente SOAP
  const client = await soap.createClientAsync(wsdlPath || wsdlUrl, {
    wsdl_options: {
      // Esto es para mTLS si hace falta
      cert: cert,
      key: key,
      // puedes añadir passphrase si el key la tiene
    },
  });

  // Verifica que el cliente tenga el endpoint correcto
  if (!process.env.VERIFACTU_URL) {
    return new Error('Es preciso configurar la variable de entorno VERIFACTU_URL');
  }
  client.setEndpoint(process.env.VERIFACTU_URL);

  // Enviar mensaje
  const [result, rawResponse, soapHeader, rawRequest] = await client.RegFactuSistemaFacturacion({
    // A veces el nombre del método es RegFactuSistemaFacturacion
    // Dependerá del WSDL: lee el método que expone para “Registrar Alta”
    xml: xml,
  });

  console.log('Resultado:', result);
  console.log('Raw response:', rawResponse);


  /*
  const httpsAgent = new https.Agent({ cert, key });
  const resp = await axios.post(process.env.VERIFACTU_URL, xml, { httpsAgent, headers: { 'Content-Type': 'text/xml; charset=utf-8' }});
  console.log(resp.data);
  */
 return null;
}