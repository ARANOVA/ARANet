import { DateTime } from 'luxon';

export const isSaturday = (d: Date): boolean => {
  const _d = DateTime.fromJSDate(d, { zone: 'utc' });
  // 0 = domingo, 1 = lunes, ..., 6 = sábado
  return _d.weekday % 7 === 6;
};

export const isSunday = (d: Date): boolean => {
  const _d = DateTime.fromJSDate(d, { zone: 'utc' });
  return _d.weekday === 6;
};

export const isMonday = (d: Date): boolean => {
  const _d = DateTime.fromJSDate(d, { zone: 'utc' });
  return _d.weekday === 1;
};

/**
 * Retorna true/false si un evento es futuro o no
 *
 * @param {string} iso1 fecha1 en formato ISO
 * @param {string} iso2 fecha2 en formato ISO
 * @returns {boolean}
 */
export const isFutureEventFromIso = (iso1: string, iso2: string): boolean => {
  const dt1 = DateTime.fromISO(iso1, { zone: 'utc' });
  const dt2 = DateTime.fromISO(iso2, { zone: 'utc' });
  return !dt1.hasSame(dt2, 'day');
};

/**
 * Retorna el año en curso o el año
 */
export const getYearFromSQL = (year: string): number => {
  return year !== 'null' ? Number(year) : DateTime.utc().year;
};

/**
 * Devuelve el día del año para una fecha o para el día actual
 *
 * @param {Date} date
 * @returns {number}
 */
export const getDayOfYear = (date?: Date): number => {
  const d = date ? DateTime.fromJSDate(date, { zone: 'utc' }) : DateTime.utc();
  return d.startOf('day').ordinal;
};

export const parseFromIso = (iso: string): DateTime => {
  return DateTime.fromISO(iso, { zone: 'utc' });
};

export const parseFromIsoToSql = (iso: string): string => {
  return DateTime.fromISO(iso, { zone: 'utc' }).toFormat('yyyyLLdd');
};

export const parseFromDateToEngString = (
  date: Date,
  format = 'yyyy-MM-dd'
): string => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(format);
};

/**
 * Parsea una fecha en string o date y la devuelve como date en UTC
 *
 * @param {string | Date} value
 * @returns {Date} date en UTC
 */
export const stringOrDateToDate = (value: string | Date): Date => {
  if (typeof value === 'string') {
    return DateTime.fromFormat(value, 'dd/MM/yyyy', { zone: 'utc' }).toJSDate();
  }
  return DateTime.fromISO(value.toISOString(), { zone: 'utc' }).toJSDate();
};

export const parseFromDateToHourString = (date: string): string => {
  const dt = DateTime.fromFormat(date, "yyyyMMdd'T'HHmmss'Z'", { zone: 'utc' });
  return dt.toFormat('HH:mm');
};

export const getStartDateTime = (date: Date, hours: number[] = []): Date => {
  const ts = DateTime.fromJSDate(date, { zone: 'utc' }).set({
    hour: hours.length > 0 ? hours[0] : 0,
    minute: hours.length > 1 ? hours[1] : 0,
    second: hours.length > 2 ? hours[2] : 0,
    millisecond: hours.length > 3 ? hours[3] : 0,
  });
  return ts.toJSDate();
};

export const getMonthIndex = (dayOfYear: number, year: number): number => {
  const dt = dateFromDayOfYear(dayOfYear, year);
  return dt.month - 1;
};

export const getDatesFromEvent = (event: {
  dtstart?: string;
  dtend: string;
}): { dtstart: DateTime | null; dtend: DateTime } => {
  const dtstart = event.dtstart
    ? DateTime.fromISO(event.dtstart, { zone: 'utc' })
    : null;
  const dtend = DateTime.fromISO(event.dtend, { zone: 'utc' });
  return { dtstart, dtend };
};

export const getEndOfDay = (iso: string): DateTime => {
  return DateTime.fromISO(iso, { zone: 'utc' }).endOf('day');
};

/** No usado */
export const hoursFormat = (hours: number): string => {
  return hours % 1 === 0 ? hours.toString() : hours.toFixed(1);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dateCellFormatter = ({
  getValue,
  locale = 'es-ES',
}: {
  getValue: any;
  locale: 'es-ES';
}) => {
  const raw = getValue();
  const date = raw ? new Date(raw) : null;
  return date
    ? date.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';
};

export const monthNames = (locale: string): string[] => {
  return Array.from({ length: 12 }, (_, i) =>
    DateTime.local()
      .set({ month: i + 1 })
      .setLocale(locale)
      .toFormat('LLLL')
  );
};

export const dateToXlsxSerial = (date: Date): number => {
  const epoch = new Date(Date.UTC(1899, 11, 30)); // 1900 system base
  return (date.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24);
};

/**
 * Devuelve la fecha JS a partir de una fecha de excel
 *
 * @param {number} serial
 * @returns {Date}
 */
export const xlsxDateToJSDate = (serial: number): Date => {
  // Excel epoch = 1900-01-01
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400; // segs
  const date_info = new Date(utc_value * 1000);
  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate()
  );
};

/**
 * Devuelve la fecha luxon a partir de una fecha de excel
 *
 * @param {number} serial
 * @returns {DateTime}
 */
export const xlsxDateToDateTime = (serial: number): DateTime => {
  // Excel epoch = 1900-01-01
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400; // segs
  const date_info = new Date(utc_value * 1000);
  return DateTime.fromJSDate(date_info, { zone: 'utc' });
};

/**
 * Devuelve la fecha de nacimiento para una edad
 *
 * @param {number} edad
 * @returns {string} date formated for SQL
 */
export const yearsOldToSQLDate = (edad: number): string => {
  // Año actual menos la edad
  const anioNacimiento = DateTime.utc().year - edad;
  // Fecha a 01-01 del año correspondiente
  return DateTime.fromObject({
    year: anioNacimiento,
    month: 1,
    day: 1,
  }).toFormat('yyyyLLdd');
};

/**
 * Devuelve la fecha de nacimiento para un formato excel
 *
 * @param {number} date
 * @returns {string} date formated for SQL
 */
export const xlsxDateToSQLDate = (date: number): string => {
  const jsDate = xlsxDateToJSDate(date);
  return DateTime.fromJSDate(jsDate, { zone: 'utc' }).toFormat('yyyyLLdd');
};

/**
 * Devuelve el número de días del año
 *
 * @param {number} year
 * @returns {number}
 */
export const getDaysInYear = (year: number): number => {
  const startOfYear = DateTime.fromObject(
    { year: year, month: 1, day: 1 },
    { zone: 'utc' }
  );
  return startOfYear.daysInYear;
};

/**
 * Devuelve una fecha luxon para un año y un día
 *
 * @param {number} dayOfYear
 * @param {number} year
 * @returns
 */
export const dateFromDayOfYear = (
  dayOfYear: number,
  year: number
): DateTime => {
  // Crear un DateTime para el inicio del año en UTC
  const start = DateTime.utc(year, 1, 1).startOf('day');
  // Sumar (día del año - 1) días
  return start.plus({ days: dayOfYear - 1 });
};

/**
 * Devuelve el número de días hasta fin del año
 *
 * @param {DateTime} date
 * @returns {number}
 */
export const getDaysTillEndOfYear = (startDate: DateTime): number => {
  const endOfYear = DateTime.fromObject(
    { year: startDate.year, month: 12, day: 31 },
    { zone: 'utc' }
  );
  return endOfYear.diff(startDate, 'days').days + 1;
};

/**
 * Devuelve una fecha Luxon para un año, día del año y hora:minuto opcionales como string "HH:mm",
 * y la formatea como "YYYYMMDDTHHmmssZ"
 *
 * @param dayOfYear Día del año (1-365/366)
 * @param year Año
 * @param time String con hora y minuto "HH:mm", opcional
 * @returns string en formato "YYYYMMDDTHHmmssZ"
 */
export const dateFromDayOfYearWithHours = (
  dayOfYear: number,
  year: number,
  time?: string
): string => {
  const start = DateTime.utc(year, 1, 1).startOf('day');

  let hour = 0;
  let minute = 0;

  if (time) {
    const [h, m] = time.split(':').map(Number);
    hour = h ?? 0;
    minute = m ?? 0;
  }

  const dt = start.plus({ days: dayOfYear - 1 }).set({ hour, minute });
  return dt.toFormat("yyyyLLdd'T'HHmmss'Z'");
};
/**
 * Devuelve la diferencia entre dtstart y dtend en horas, minutos o segundos
 * Por defecto en horas
 *
 * @param {{ dtstart?: string; dtend: string }} event  Evento con dtstart y dtend en formato ISO
 * @param {'hours' | 'minutes' | 'seconds' = 'hours'} scale
 * @returns {number}
 */
export function getDiffFromEvent(
  event: { dtstart?: string; dtend: string },
  scale: 'hours' | 'minutes' | 'seconds' = 'hours'
): number {
  const { dtstart, dtend } = getDatesFromEvent(event);
  if (!dtstart) {
    const dtstart = dtend.startOf('day');
    return dtend.diff(dtstart, scale).as(scale);
  }
  // Calculamos la diferencia en la unidad solicitada
  return dtend.diff(dtstart, scale).as(scale);
}

export const obtenerDiaEnd = (
  dayId: number,
  startTime: string,
  endTime: string
): number => {
  // Parseamos horas
  const start = DateTime.fromFormat(startTime, 'HH:mm');
  let end = DateTime.fromFormat(endTime, 'HH:mm');

  // Si end es menor o igual a start => significa que acaba al día siguiente
  if (end <= start) {
    end = end.plus({ days: 1 });
  }

  // Jornada en minutos (por si lo necesitas)
  // TODO const jornada = end.diff(start, "minutes").minutes;

  // Si el final es otro día → dayId + 1
  return end.day !== start.day ? dayId + 1 : dayId;
};

/**
 * Devuelve true si la fecha de referencia (en ISO) es mayor que la fecha a comparar
 *
 * @param {string} date
 * @param {Date | undefined} dateToCompare
 * @returns {boolean}
 */
export const isAfter = (date: string, dateToCompare?: Date): boolean => {
  return parseFromIso(date) > DateTime.fromJSDate(dateToCompare || new Date());
};

/**
 * Devuelve true si la fecha de referencia (en ISO) es menor que la fecha a comparar
 *
 * @param {string} date
 * @param {Date | undefined} dateToCompare
 * @returns {boolean}
 */
export const isBefore = (date: string, dateToCompare?: Date): boolean => {
  return parseFromIso(date) < DateTime.fromJSDate(dateToCompare || new Date());
};

/**
 * Devuelve los días entre cday y last_day según reglas de tool
 *
 * @param {number} cday día de año
 * @param {number} anio  año
 * @param {number} last_day último día de año
 * @param {'from' | 'to'} last_type tipo de último día
 * @param tool
 * @returns [number, DateTime][]
 */
export function getDaysBetween(
  cday: number,
  anio: number,
  last_day: number | undefined,
  last_type: 'from' | 'to',
  tool: {
    type: 'from' | 'to';
    insab: boolean | number;
    indom: boolean | number;
  }
): [number, DateTime][] {
  let day = DateTime.fromObject({ year: anio }).plus({ days: cday - 1 });
  const days: [number, DateTime][] = [];

  if (last_day && last_type === 'from' && tool.type === 'to') {
    if (cday > last_day) {
      for (let idx = last_day; idx <= cday; idx++) {
        day = DateTime.fromObject({ year: anio }).plus({ days: idx - 1 });
        if (
          (day.weekday > 0 && day.weekday < 6) || // lunes-viernes
          (Number(tool.insab) && day.weekday === 6) || // sábado
          (Number(tool.indom) && day.weekday === 7) // domingo
        ) {
          days.push([idx, day]);
        }
      }
    } else {
      for (let idx = last_day; idx >= cday; idx--) {
        day = DateTime.fromObject({ year: anio }).plus({ days: idx - 1 });
        if (
          (day.weekday > 0 && day.weekday < 6) ||
          (Number(tool.insab) && day.weekday === 6) ||
          (Number(tool.indom) && day.weekday === 7)
        ) {
          days.push([idx, day]);
        }
      }
    }
  } else {
    days.push([cday, day]);
  }

  return days;
}

export const getHorasInMonths = (
  dtstart: DateTime,
  dtend: DateTime
): [number, number][] => {
  const hjornada: [number, number][] = [];
  const midx = dtstart.month - 1;
  const startOfNextMonth = dtstart.plus({ months: 1 }).startOf('month');
  if (dtend < startOfNextMonth) {
    // Mismo mes
    const hs = dtend.diff(dtstart, 'hours').hours;
    hjornada.push([midx, hs]);
  } else {
    // Jornada en 2 meses
    const hs1 = startOfNextMonth.diff(dtstart, 'hours').hours;
    hjornada.push([midx, hs1]);
    if (midx + 1 < 12) {
      const hs2 = dtend.diff(startOfNextMonth, 'hours').hours;
      hjornada.push([midx + 1, hs2]);
    } else {
      // Qué pasa si se acumula al siguiente año???
    }
  }
  return hjornada;
};

export const parseDate = (fecha: string): string => {
  if (!fecha) return '';
  const [dia, mes, anio] = fecha.split('/');
  return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
};

export const parseDescanso = (descanso: string) => {
  if (!descanso) return;
  const match = descanso.match(/\d+/);
  return match ? Number(match[0]) : 0;
};
