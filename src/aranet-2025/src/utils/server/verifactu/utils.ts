import { InvoiceTypeEnum } from './consts';

export type SimpleType = string | Date | number | boolean | undefined;

export type FormatAndValidationFunction = (x: SimpleType) => string;

export function toString(v: SimpleType): string {
    if (undefined === v || null === v) {
        return "";
    }
    return v.toString();
}

function toStringMaxLength(maxLength: number): FormatAndValidationFunction {
    return (v: SimpleType): string => {
        const r = toString(v);
        if (r.length > maxLength) {
            throw new Error(`Value ${v} is longer than ${maxLength}.`);
        }
        return r;
    };
}

export const toStr2 = toStringMaxLength(2);
export const toStr7 = toStringMaxLength(7);
export const toStr10 = toStringMaxLength(10);
export const toStr15 = toStringMaxLength(15);
export const toStr20 = toStringMaxLength(20);
export const toStr30 = toStringMaxLength(30);
export const toStr50 = toStringMaxLength(50);
export const toStr60 = toStringMaxLength(60);
export const toStr64 = toStringMaxLength(64);
export const toStr100 = toStringMaxLength(100);
export const toStr120 = toStringMaxLength(120);
export const toStr250 = toStringMaxLength(250);
export const toStr500 = toStringMaxLength(500);

export function toStringTruncate(maxLength: number): FormatAndValidationFunction {
    return (v: SimpleType): string => {
        return toString(v).substr(0, maxLength);
    };
}

export const toStrTruncate100 = toStringTruncate(100);

export const toInvoiceType = (tipoId: number | null): string => {
  switch (tipoId) {
    case 1:
      return InvoiceTypeEnum.F1;
    // case 5:
    //   return InvoiceTypeEnum.F5;
    // No usadas
    // case 4:
    //   return TipoFactura.F2;
    // case 3:
    //   return TipoFactura.F1;
    // case 4:
    //   return TipoFactura.F4;
    default:
      return InvoiceTypeEnum.F1;
  }
}

export const toDateString = (raw: Date | string): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  }
  return date
    ? `${date.getDay().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`
    : '';
}

export const toDateIso = (raw: Date | string): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    date = new Date(raw);
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

function roundPrecision(value: number, precision: number): number {
    if (!value) {
        return 0;
    } else if (!precision || precision < 0) {
        precision = 1;
    }
    let normalizedValue = value / precision;
    const epsilonMagnitude = Math.log(Math.abs(normalizedValue)) / Math.log(2);
    const epsilon = Math.pow(2, epsilonMagnitude - 52);
    normalizedValue += normalizedValue >= 0 ? epsilon : -epsilon;

    /**
     * Javascript performs strictly the round half up method, which is asymmetric. However, in
     * Python, the method is symmetric. For example:
     * - In JS, Math.round(-0.5) is equal to -0.
     * - In Python, round(-0.5) is equal to -1.
     * We want to keep the Python behavior for consistency.
     */
    const sign = normalizedValue < 0 ? -1.0 : 1.0;
    const roundedValue = sign * Math.round(Math.abs(normalizedValue));
    return roundedValue * precision;
}

export function round2(n: number): number {
    return roundPrecision(n, 0.01);
}

export function round3(n: number): number {
    return roundPrecision(n, 0.001);
}

export function round8(n: number): number {
    return roundPrecision(n, 0.00000001);
}

export function round2ToString(n: SimpleType): string {
    if (typeof n === "number") {
        return round2(n).toFixed(2);
    }
    throw Error(`Number expected and ${n} found.`);
}

export function round8ToString(n: SimpleType): string {
    if (typeof n === "number") {
        return round8(n).toFixed(8);
    }
    throw Error(`Number expected and ${n} found.`);
}