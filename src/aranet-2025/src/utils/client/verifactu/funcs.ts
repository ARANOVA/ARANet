'use client';

import { toDateIso, toDateString } from "@/utils/date.utils";
import { buildXmlRegistro } from "./xmlBuilder";
import { aranet_invoice_join_all, aranet_invoice_verifactu } from "@/interfaces";
import { round2 } from "@/utils/number.utils";
import { toInvoiceType } from "@/utils/verifactu.utils";

const hashString = async(str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

// Utils
const sumItems = (invoice: aranet_invoice_join_all): { taxAmount: number; totalAmount: number } => {
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

// 1. Generar XML
export const verifactuBuildRegistroAltaXML = (
  invoice: aranet_invoice_verifactu,
): string | Error => {
  // 1. Comprobaciones iniciales
  if (!process.env.NEXT_PUBLIC_COMPANY_CIF || !process.env.NEXT_PUBLIC_COMPANY_FULLNAME) {
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

export const verifactuCalcHuella = async (
  invoice: aranet_invoice_verifactu,
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

  if (!process.env.NEXT_PUBLIC_COMPANY_CIF || !process.env.NEXT_PUBLIC_COMPANY_FULLNAME) {
    return new Error("Faltan valores de entorno de la empresa");
  }

  const prefix = invoice.invoice_prefix || '';
  if (!invoice.invoice_total_amount) {
    return new Error("Debe tener un importe total válido");
  }

  let inputStr = '';
  if (type === 'alta') {
    const { taxAmount, totalAmount } = sumItems(invoice);
    const input: string[] = [
      'IDEmisorFactura=' + process.env.NEXT_PUBLIC_COMPANY_CIF,
      'NumSerieFactura=' + `${prefix}|${invoice.invoice_number}`,
      'FechaExpedicionFactura=' + invoiceDate,
      'TipoFactura=' + toInvoiceType(invoice.invoice_kind_of_invoice_id),
      'CuotaTotal=' + taxAmount,
      'ImporteTotal=' + round2(totalAmount + taxAmount),
      'Huella=' + (invoice.huellaPrev || ''),
      'FechaHoraHusoGenRegistro=' + generationDate,
    ];
    inputStr = input.join('&');
  } else {
    // Cancelación
    const input: string[] = [
      'IDEmisorFacturaAnulada=' + process.env.NEXT_PUBLIC_COMPANY_CIF,
      'NumSerieFacturaAnulada=' + `${prefix}|${invoice.invoice_number}`,
      'FechaExpedicionFacturaAnulada=' + invoiceDate,
      'Huella=' + (invoice.huellaPrev || ''),
      'FechaHoraHusoGenRegistro=' + generationDate,
    ];
    inputStr = input.join('&');
  }
  const hash = await hashString(inputStr);
  return hash.toUpperCase();
}