import os from 'os';
import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import crypto from 'crypto';
import { aranet_invoice_join_items, aranet_invoice_verifactu } from "@/interfaces";
import { ClientSSLSecurityPFX, createClientAsync, IOptions } from "soap";
import { buildXmlConsulta, buildXmlRegistro } from './xmlBuilder';
import { toDateIso, toDateString } from '@/utils/date.utils';
import { round2 } from '@/utils/number.utils';
import { NSS, toInvoiceType } from '@/utils/verifactu.utils';

// Utils
const sumItems = (invoice: aranet_invoice_join_items): { taxAmount: number; totalAmount: number } => {
  let taxAmount = 0;
  let totalAmount = 0;
  (invoice.invoice_items || []).forEach((d) => {
    if (d.item_cost === 0 || d.item_cost === null) return;
    const tax_amount = round2(((d.item_tax_rate || 0) / 100) * d.item_cost);
    taxAmount += tax_amount;
    totalAmount += d.item_cost;
  });
  return { taxAmount, totalAmount };
}

// Pre
export const sendToVerifactu = async (
  xml: string,
  type: 'alta' | 'consulta',
): Promise<Error | any> => {
  const method = type === 'alta' ? 'RegFactuSistemaFacturacion' : 'ConsultaFactuSistemaFacturacion';
  const CERT_PATH = process.env.CERT_PATH || '';
  if (!CERT_PATH) {
    return new Error('Needed env variable CERT_PATH');
  }
  const certPath = path.join(process.cwd(), CERT_PATH); //.replace('/ROOT/', './');
  if (!fs.existsSync(certPath)) {
    return new Error(`Certificate not found at ${certPath}`);
  }
  const CERT_PASSPHRASE = process.env.CERT_PASSPHRASE || '';
  if (!CERT_PASSPHRASE) {
    return new Error('Needed env variable CERT_PASSPHRASE');
  }

  const env = process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'TEST';
  const seal = process.env.CERT_SEAL === 'seal' ? '_SEAL' : '';
  const wsdlUrl = process.env[`VERIFACTU_URL_${env}${seal}`];
  if (!wsdlUrl) {
    return new Error(`Missing env var VERIFACTU_URL_${env}${seal}`);
  }

  // Client options for the SOAP call
  const options: IOptions = {
    wsdl_options: {
      disableCache: true,
      location: 'wsdl'
    },
    endpoint: wsdlUrl,
  };

  const wsdPath = path.join(process.cwd(), 'verifactu-dev', 'xsd2', 'SistemaFacturacion.wsdl');
  if (!fs.existsSync(wsdPath)) {
    console.log(`Can't get local wsdl for connections`);
    return new Error(`Can't get local wsdl for connections`);
    // wsdPath = wsdlUrl;
  }
  const client = await createClientAsync(
    wsdPath,
    options,
    wsdlUrl,
  );

  client.setSecurity(
    new ClientSSLSecurityPFX(
      CERT_PATH,
      CERT_PASSPHRASE,
    ),
  );

  // Enviar mensaje
  switch (method) {
    case 'RegFactuSistemaFacturacion':
      const [res] = await client.RegFactuSistemaFacturacionAsync({_xml: xml});
      return res;
    case 'ConsultaFactuSistemaFacturacion':
      const [result] = await client.ConsultaFactuSistemaFacturacionAsync({_xml: xml});
      // console.log("Result:", result);
      // console.log("Raw Request:", rawRequest);
      // console.log("Raw Response:", rawResponse);
      // console.log("Soap header:", soapHeader)
      return result;
    }
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
  return buildXmlConsulta(year, month);
}

// 1. Generar XML
export const verifactuBuildRegistroAltaXML = (
  invoice: aranet_invoice_verifactu,
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

  // 2. Generar XML
  return buildXmlRegistro(invoice);
}


// --- 2) calcular la huella (SHA-256) ---
// IMPORTANTE: el "string de entrada" y el orden de concatenación debe seguir
// exactamente el documento AEAT "Algoritmo de cálculo de la huella".
// Aquí hay un ejemplo ilustrativo: concatena campos y la huella anterior si existe.
export const verifactuCalcHuella = async (
  invoice: aranet_invoice_join_items,
  huellaPrev: string | null,
  type: 'alta' | 'cancelacion',
): Promise<Error | string> => {
  // --- construye la cadena tal como especifique AEAT (ejemplo simplificado) ---
  const invoiceDate = toDateString(invoice.invoice_date);
  if (!invoiceDate) {
    return new Error("La factura debe que tener fecha de emisión");
  }

  const generationDate = toDateIso(invoice.freeze_at);
  if (!generationDate) {
    return new Error("La factura debe que tener fecha de congelación");
  }

  if (!process.env.COMPANY_CIF || !process.env.COMPANY_FULLNAME) {
    return new Error("Faltan valores de entorno de la empresa");
  }

  const prefix = invoice.invoice_prefix || '';
  if (!invoice.invoice_total_amount) {
    return new Error("Debe tener un importe total válido");
  }

  let inputStr = '';
  if (type === 'alta') {
    // IDEmisorFactura=B99078248&NumSerieFactura=F-25-0001&FechaExpedicionFactura=04-01-2025&TipoFactura=F1&CuotaTotal=55.13&ImporteTotal=317.63&Huella=&FechaHoraHusoGenRegistro=2025-01-02T10:06:42+01:00\n Huella calculada: 7227341FF5AB09ECCE1D73E8C04F6D70F03F15D8AC5E60AA32E350562879962F
    // IDEmisorFactura=B99078248&NumSerieFactura=F-25-0001&FechaExpedicionFactura=04-01-2025&TipoFactura=F1&CuotaTotal=55.13&ImporteTotal=317.63&Huella=&FechaHoraHusoGenRegistro=2025-10-05T14:15:58.152Z
    const { taxAmount, totalAmount } = sumItems(invoice);
    const input: string[] = [
      'IDEmisorFactura=' + process.env.COMPANY_CIF,
      'NumSerieFactura=' + `${prefix}${invoice.invoice_number}`,
      'FechaExpedicionFactura=' + invoiceDate,
      'TipoFactura=' + toInvoiceType(invoice.invoice_kind_of_invoice_id),
      'CuotaTotal=' + taxAmount,
      'ImporteTotal=' + round2(totalAmount + taxAmount),
      'Huella=' + (huellaPrev || ''),
      'FechaHoraHusoGenRegistro=' + generationDate,
    ];
    inputStr = input.join('&');
  } else {
    // Cancelación
    const input: string[] = [
      'IDEmisorFacturaAnulada=' + process.env.COMPANY_CIF,
      'NumSerieFacturaAnulada=' + `${prefix}|${invoice.invoice_number}`,
      'FechaExpedicionFacturaAnulada=' + invoiceDate,
      'Huella=' + (huellaPrev || ''),
      'FechaHoraHusoGenRegistro=' + generationDate,
    ];
    inputStr = input.join('&');
  }
  const hash = crypto.createHash('sha256').update(inputStr, 'utf8').digest('hex').toUpperCase();
  return hash;
}

// --- 3) validar contra XSD (descargado de AEAT) ---
export const verifactuValidateXmlAgainstXsd = async (
  xmlString: string,
  type: 'alta' | 'consulta',
): Promise<{ valid: boolean; error?: string; }> => {
  // Determinar XSD y xmlns según el tipo
  const xds = type === 'alta' ? 'SuministroLR.xsd' : 'ConsultaLR.xsd';
  const xmlns: Record<string, string> = type === 'alta' ? NSS.alta : NSS.consulta;  
  const xsdPath = getXsdPath(xds);
  if (!fs.existsSync(xsdPath)) {
    return { valid: false, error: `XSD file not found at ${xsdPath}` }
  }
  const rootTag = type === 'alta' ? 'sfLR:RegFactuSistemaFacturacion' : 'sfLRC:ConsultaFactuSistemaFacturacion';

  // Crear ruta temporal
  const tempDir = os.tmpdir();
  const tempXmlPath = path.join(tempDir, `temp_${Date.now()}.xml`);

  // Dejar sólo el body
  const regex = new RegExp(`<${rootTag}>([\\s\\S]*?)<\\/${rootTag}>`);
  const match = xmlString.match(regex);
  if (!match || !match[1]) {
    console.log({xmlString})
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
  
  // Escribir el XML en un archivo temporal
  fs.writeFileSync(tempXmlPath, bodyXml, { encoding: 'utf-8' });

  return new Promise((resolve, reject) => {
    exec(`xmllint --noout --nonet --schema ${xsdPath} ${tempXmlPath}`, (err, stdout, stderr) => {
      // Borrar
      // TEMP fs.unlinkSync(tempXmlPath);
      if (err) reject({ valid: false, error: JSON.stringify(stderr) });
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


export const getXsdPath = (xsdFileName: string): string => {
  return path.join(__dirname, '..', '..', '..', '..', 'verifactu-dev', 'xsd2', xsdFileName).replace('/ROOT/', './');
}
