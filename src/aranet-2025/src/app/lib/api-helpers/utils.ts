
export const parseFilter = (value: string) => {
  const match = value.match(/^([<>]=?|!=|=)?\s*(\d+(\.\d+)?)$/);
  if (!match) return { contains: value };

  const [, operator, number] = match;
  const num = parseFloat(number);

  switch (operator) {
    case ">":  return { gt: num };
    case ">=": return { gte: num };
    case "<":  return { lt: num };
    case "<=": return { lte: num };
    case "!=": return { not: num };
    case "=":
    case undefined: return { equals: num };
    default: return { equals: num };
  }
}