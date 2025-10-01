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
  data: { deleted_at: Date | null; freeze_at?: Date | null; signed_at?: Date | null; sent_at?: Date | null; },
): { value: string; suffix?: string } | undefined => {
  if (data.deleted_at) {
    return { value: 'deleted', suffix: datePipe(data.deleted_at) };
  }
  if (data.sent_at) {
    return { value: 'sent', suffix: datePipe(data.sent_at) };
  }
  if (data.signed_at) {
    return { value: 'signed', suffix: datePipe(data.signed_at) };
  }
  if (data.freeze_at) {
    return { value: 'frozen', suffix: datePipe(data.freeze_at) };
  }
  return undefined;
}


