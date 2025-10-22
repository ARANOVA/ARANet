const datePipe = (raw: Date | string, locale: string = navigator?.language || 'es-ES'): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  }
  return date
    ? date.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    : '';
}

export const getModelState = (
  data: {
    deleted_at: Date | null;
    freeze_at?: Date | null;
    signed_at?: Date | null;
    sent_at?: Date | null;
    invoice_payment_status_id?: number | null;
    invoice_payment_date?: Date | null;
  },
): { value: string; title: string, suffix?: string } | undefined => {
  if (data.deleted_at) {
    return { value: 'deleted', title: 'Borrado', suffix: datePipe(data.deleted_at) };
  }
  if (data.sent_at) {
    return { value: 'sent', title: 'Registrado', suffix: datePipe(data.sent_at) };
  }
  if (data.signed_at) {
    return { value: 'signed', title: 'Firmado', suffix: datePipe(data.signed_at) };
  }
  if (data.freeze_at) {
    return { value: 'frozen', title: 'Congelado', suffix: datePipe(data.freeze_at) };
  }
  if (data.invoice_payment_status_id === 3 && data.invoice_payment_date) {
    return { value: 'payed', title: 'Pagada', suffix: datePipe(data.invoice_payment_date) };
  }
  if (data.invoice_payment_status_id === 1) {
    return { value: 'pending-payment', title: 'Pendiente de pago' };
  }
  return undefined;
}


