'use server';

import { aranet_invoice_verifactu, VerifactuQuery } from '@/interfaces';
import { signXmlString } from './verifactu/xmlSigner';
import { sendToVerifactu, verifactuBuildConsultaRegistrosXML, verifactuBuildRegistroAltaXML, verifactuCalcHuella, verifactuValidateXmlAgainstXsd } from './verifactu';

// ---- consulta --
export const verifactuConsulta = async (year: number, month: number): Promise<Error | VerifactuQuery> => {
  // 1. Generar XML
  const xml = await verifactuBuildConsultaRegistrosXML(year, month);
  if (xml instanceof(Error)) {
    // TODO
    return xml;
  }

  const xmlWithoutDeclaration = xml.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
  
  // 2. Validar
  try {
    const validation = await verifactuValidateXmlAgainstXsd(xml, 'consulta');
    if (!validation.valid) {
      console.log('XML no válido:', validation.error);
      throw new Error(validation.error);
    }
    
    // 3. Firmar
    const signed = signXmlString(xmlWithoutDeclaration);
    if (signed instanceof Error) {
      throw signed;
    }

    // 4. Enviar
    const resp = await sendToVerifactu(signed, 'consulta');
    if (resp instanceof(Error)) {
      // TODO
      throw resp;
    }
    // 5. Hacer algo con esto
    console.log({resp})
    return resp;
  } catch (err) {
    console.log('Error al validar XML:', err);
    throw err;
  }

}

// --- flujo ---
export const verifactuFlow = async(invoice: aranet_invoice_verifactu): Promise<Error | void> => {
  // 1. Generar XML
  const build = await verifactuBuildRegistroAltaXML(invoice);
  if (build instanceof(Error)) {
    // TODO
    return build;
  }

  // 2. Calcular huella y reemplazar placeholder
  const huella = invoice.sent_hash || await verifactuCalcHuella(invoice, invoice.huellaPrev, 'alta');
  if (huella instanceof(Error)) {
    // TODO
    return huella;
  }
  const xml = build.replace('HUELLA_PLACEHOLDER', huella);
  const xmlWithoutDeclaration = xml.replace('<?xml version="1.0" encoding="UTF-8"?>', '');

  // 3. Validar
  try {
    const validation = await verifactuValidateXmlAgainstXsd(xml, 'alta');
    if (!validation.valid) {
      console.log('XML no válido:', validation.error);
      throw new Error(validation.error);
    }

    // 4. Firmar
    const signed = signXmlString(xmlWithoutDeclaration);
    if (signed instanceof Error) {
      throw signed;
    }
    
    // 5. Enviar
    const resp = await sendToVerifactu(signed, 'alta');
    if (resp instanceof(Error)) {
      // TODO
      throw resp;
    }
    // 6. Hacer algo con esto
    console.log({resp});
  } catch (err) {
    console.log('Error al validar XML:', err);
    throw err;
  }
}