type SimpleType = string | Date | number | boolean | undefined;

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
