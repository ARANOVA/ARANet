type SimpleType = string | Date | number | boolean | undefined;

type FormatAndValidationFunction = (x: SimpleType) => string;

export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const joinWithSeparators = (
  values: (string | null | undefined)[],
  separators: string[]
): string => {
  const filtered = values.filter((v): v is string => v != null && v !== "");
  let result = "";

  filtered.forEach((val, i) => {
    result += val;
    if (i < filtered.length - 1) {
      result += separators[i] ?? ""; // usa el separador correspondiente si existe
    }
  });

  return result;
}

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
