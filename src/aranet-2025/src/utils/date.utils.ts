import { DateTime } from 'luxon';

export const toShortDate = (date: string | Date): string => {
  return DateTime.fromJSDate(new Date(date)).toLocaleString(DateTime.DATE_SHORT);
};

export const toISODate = (date: string | Date): string => {
  return DateTime.fromJSDate(new Date(date)).toISODate() || '';
};

export const formatDate = (raw: Date | string | null): string => {
  if (!raw) return '';
  let date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    // ISO en string
    date = new Date(raw);
  }
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  // Formatear a dd/mm/yyyy
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const formatDatetime = (raw: Date | string | null): string => {
  if (!raw) return '';
  let date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    // ISO en string
    date = new Date(raw);
  }
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  // Formatear a dd/mm/yyyy
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const toDateString = (raw: Date | string | null): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  } else if (raw instanceof Date) {
    date = raw;
  }
  return date
    ? `${date.getDay().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`
    : '';
}


export const toDateIso = (raw: Date | string | null): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  } else if (raw instanceof Date) {
    date = raw;
  }
  return date
    ? date.toISOString().replace('.000Z', '+01:00')
    : '';
}

export const toTimeString = (raw: Date | string): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  }
  return date
    ? date.toISOString().split('T')[1].split(".")[0]
    : '';
}

export const toUTCTimeString = (raw: Date | string): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  }
  if (date instanceof Date) {
    const hours = ("00" + date.getUTCHours()).slice(-2),
      minutes = ("00" + date.getUTCMinutes()).slice(-2),
      seconds = ("00" + date.getUTCSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  }
  return '';
}