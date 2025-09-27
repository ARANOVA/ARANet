'use server';

import path from 'path';
import { aranet_invoice_verifactu } from '@/interfaces';
import { NSS, sendToVerifactu, verifactuBuildConsultaRegistrosXML, verifactuBuildRegistroAltaXML, verifactuCalcHuella, verifactuValidateXmlAgainstXsd } from './verifactu';
import { signXmlString } from './verifactu/xmlSigner';

// ---- consulta --
export const verifactuConsulta = async (year: number, month: number): Promise<Error | void> => {
  const xml = await verifactuBuildConsultaRegistrosXML(year, month);
  if (xml instanceof(Error)) {
    // TODO
    return xml;
  }
  // 2. Validar
  try {
    const xsdPath = path.join(__dirname, '..', '..', '..', 'verifactu-dev', 'xsd2', 'ConsultaLR.xsd').replace('/ROOT/', './');
    const validation = await verifactuValidateXmlAgainstXsd(xml, xsdPath, NSS.consulta, 'sfLRC:ConsultaFactuSistemaFacturacion');
    if (!validation.valid) {
      console.log('XML no válido:', validation.error);
      throw new Error(validation.error);
    }
    
    // TODO: 3. Firmar
    const signed = signXmlString(xml);
    if (signed instanceof Error) {
      throw signed;
    }

    console.log({xml})
    const resp = await sendToVerifactu(signed, 'ConsultaFactuSistemaFacturacion');
    console.log({resp})
    if (resp instanceof(Error)) {
      // TODO
      throw resp;
    }
  } catch (err) {
    console.log('Error al validar XML:', err);
    throw err;
  }

}

// --- flujo ---
export const verifactuFlow = async(invoice: aranet_invoice_verifactu): Promise<Error | void> => {

  // calcular huella actual según el algoritmo AEAT
  const huella = await verifactuCalcHuella(invoice, 'alta');
  if (huella instanceof(Error)) {
    // TODO
    return huella;
  }

  // construir XML y reemplazar placeholder por huella real
  const build = await verifactuBuildRegistroAltaXML(invoice);
  if (build instanceof(Error)) {
    // TODO
    return build;
  }
  const xml = build.replace('HUELLA_PLACEHOLDER', huella);

  // 2. validar contra XSD (descárgate el XSD oficial y pásalo aquí)
  try {
    const xsdPath = path.join(__dirname, '..', '..', '..', 'verifactu-dev', 'xsd', 'SuministroLR.xsd').replace('/ROOT/', './');
    const validation = await verifactuValidateXmlAgainstXsd(xml, xsdPath, NSS.alta, 'sum:RegFactuSistemaFacturacion');
    if (!validation.valid) {
      console.log('XML no válido:', validation.error);
      throw new Error(validation.error);
    } else {
      const resp = await sendToVerifactu(xml, 'RegFactuSistemaFacturacion');
      if (resp instanceof(Error)) {
        // TODO
        throw resp;
      }
    }
  } catch (err) {
    console.log('Error al validar XML:', err);
    throw err;
  }
}