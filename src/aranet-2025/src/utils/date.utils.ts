import { DateTime } from 'luxon';

export const toShortDate = (date: string | Date | null): string => {
  if (!date) return "";
  let dt: DateTime;

  if (typeof date === "number" || /^\d+$/.test(String(date))) {
    // Si es timestamp en milisegundos
    dt = DateTime.fromMillis(Number(date));
  } else if (typeof date === "string") {
    // Si es string ISO u otro formato reconocible
    dt = DateTime.fromISO(date, { zone: "utc" });
    if (!dt.isValid) {
      // fallback: intentar parsear como fecha nativa
      dt = DateTime.fromJSDate(new Date(date));
    }
  } else if (date instanceof Date) {
    dt = DateTime.fromJSDate(date);
  } else {
    return "";
  }

  // Si sigue siendo inválido, devolver vacío
  if (!dt.isValid) return "";

  // ✅ Formato corto local, como "04/10/2025"
  return dt.toFormat("dd/MM/yyyy"); //.toLocaleString(DateTime.DATE_SHORT);
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
  // La convertimos a la zona que quieras (por ejemplo, Europa/Madrid)
  const dt = DateTime.fromJSDate(date, { zone: "Europe/Madrid" });

  // Y la formateamos al estilo ISO con offset (+01:00 o +02:00)
  const formatted = dt.toISO({ precision: "seconds" });
  console.log({formatted})
  return formatted || '';
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