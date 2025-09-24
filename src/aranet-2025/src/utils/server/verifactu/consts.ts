const NS0 = "http://schemas.xmlsoap.org/soap/envelope/";
const NS1 = "https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroLR.xsd";
const NS2 = "https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd";
const NS3 = "http://www.w3.org/2000/09/xmldsig#";
const NS4 = "https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/ConsultaLR.xsd";

export const NSS = {
  alta: {
    'xmlns:soapenv': NS0,
    'xmlns:sum': NS1,
    'xmlns:sum1': NS2,
    'xmlns:xd': NS3,
  },
  consulta: {
    'xmlns:soapenv': NS0,
    'xmlns:con': NS4,
    'xmlns:sum1': NS2,
    'xmlns:sum': NS1,
  }
};

/**
 * Version of message for RegistroAlta
 */
export const ID_VERSION_REGISTRO_ALTA = '1.0'

export enum InvoiceTypeEnum {
  "F1" = "F1", //FACTURA (ART. 6, 7.2 Y 7.3 DEL RD 1619/2012)
  "F2" = "F2", //FACTURA SIMPLIFICADA Y FACTURAS SIN IDENTIFICACIÓN DEL DESTINATARIO ART. 6.1.D) RD 1619/2012
  "F3" = "F3", //FACTURA EMITIDA EN SUSTITUCIÓN DE FACTURAS SIMPLIFICADAS FACTURADAS Y DECLARADAS
  "R1" = "R1", //FACTURA RECTIFICATIVA (Art 80.1 y 80.2 y error fundado en derecho)
  "R2" = "R2", //FACTURA RECTIFICATIVA (Art. 80.3)
  "R3" = "R3", //FACTURA RECTIFICATIVA (Art. 80.4)
  "R4" = "R4", //FACTURA RECTIFICATIVA (Resto)
  "R5" = "R5", //FACTURA RECTIFICATIVA EN FACTURAS SIMPLIFICADAS
}