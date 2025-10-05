import { InvoiceTypeEnum } from '@/utils/verifactu.utils';
import path from 'path';

export const getXsdPath = (xsdFileName: string): string => {
  return path.join(__dirname, '..', '..', '..', 'verifactu-dev', 'xsd2', xsdFileName).replace('/ROOT/', './');
}

export const toInvoiceType = (tipoId: number | null): string => {
  switch (tipoId) {
    case 1:
      return InvoiceTypeEnum.F1;
    // case 5:
    //   return InvoiceTypeEnum.F5;
    // No usadas
    // case 4:
    //   return TipoFactura.F2;
    case 3: // Abono
      return InvoiceTypeEnum.R1;
    case 4: // Rectificativa
      return InvoiceTypeEnum.R1;
    default:
      return InvoiceTypeEnum.F1;
  }
}
