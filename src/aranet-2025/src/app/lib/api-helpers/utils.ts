import { SearchDTO } from "@aranova/aranova-react-ui";

const parseFilter = (value: string) => {
  const match = value.match(/^([<>]=?|!=|=)?\s*(\d+(\.\d+)?)$/);
  if (!match) return { contains: value };

  const [, operator, number] = match;
  const num = parseFloat(number);

  switch (operator) {
    case ">": return { gt: num };
    case ">=": return { gte: num };
    case "<": return { lt: num };
    case "<=": return { lte: num };
    case "!=": return { not: num };
    case "=":
    case undefined: return { equals: num };
    default: return { equals: num };
  }
}

export const searchWhere = (where: any, search: SearchDTO[], text_fields: string[] = []): void => {
  for (const s of search) {
    if (s.value === undefined) continue;

    if (s.field === "all") {
      // OR sobre TEXT_FIELDS
      where.AND.push({
        OR: text_fields.map(field => ({
          [field]: { contains: s.value },
        })),
      });
    } else {
      // Si es número con operador -> parseFilter
      const condition = parseFilter(s.value as string);
      where.AND.push({ [s.field]: condition });
    }
  }
}