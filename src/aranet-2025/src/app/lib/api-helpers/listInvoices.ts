import { ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { logDebug, logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { INVOICE_VALID_FIELDS, INVOICE_TEXT_FIELDS, INVOICE_NUMBER_FIELDS } from "@/app/data/invoice";
import { aranet_invoice_join_client } from "@/interfaces";

const filterByValidFields = (filter: SearchDTO) => {
  return INVOICE_VALID_FIELDS.includes(filter.field.toLowerCase()) || filter.field === 'all';
};

const parseFilter = (value: string) => {
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

export const listInvoices = async (
  prisma: PrismaClient,
  page: number,
  size: number,
  sortField: string,
  sortDir: 'asc' | 'desc',
  search: SearchDTO[],
  filters: string[],
): Promise<ListResponse<aranet_invoice_join_client>> => {
  
  console.log("listInvoices")
  const busquedasEncontradas: Record<string, string> = {};
  search = search.filter(filter => filterByValidFields(filter))

  logDebug(`GET /api/invoice - Búsquedas encontradas: ${JSON.stringify(busquedasEncontradas)}`);
  // const filtrosEncontrados = filters.filter((filter) => filterByValidFields(filter, '|||'));

  // TODO: CREAR FILTROS
  const filtrosExtra: unknown[] = []; // buildFiltrosExtra(filtrosEncontrados, CALENDARIO_MAPSORT);
  // logDebug(`GET /api/invoice - Filtros encontrados: ${JSON.stringify(filtrosEncontrados)}, filtros extra: ${JSON.stringify(filtrosExtra)}`);

  try {
    const where: any = { AND: [
      { deleted_at: null },
    ] };
    for (const s of search) {
      if (s.value === undefined) continue;

      if (s.field === "all") {
        // OR sobre TEXT_FIELDS
        where.AND.push({
          OR: INVOICE_TEXT_FIELDS.map(field => ({
            [field]: { contains: s.value },
          })),
        });
      } else {
        // Si es número con operador -> parseFilter
        const condition = parseFilter(s.value as string);
        where.AND.push({ [s.field]: condition });
      }
    }

    const orderBy: Record<string, string> = {};
    orderBy[sortField] = sortDir;
    const nbItems = await prisma.aranet_invoice.count({ where });
    if (size === -1) {
      size = nbItems;
      page = 1;
    }
    let start = (page - 1) * size;
    if (start > 0 && start >= nbItems) {
      start = (Math.ceil(nbItems / size) - 1) * size;
    }
    if (size > nbItems) size = nbItems;
    console.log({where: JSON.stringify(where)})
    const invoices = await prisma.aranet_invoice.findMany({
      where,
      orderBy,
      skip: start,
      take: size,
      include: {
        aranet_client: true,
      }
    });
    if (!invoices) {
      return {
        statusCode: 400,
        error: "Bad Request",
      };
    }

    return {
      statusCode: 200,
      data: {
        items: invoices,
        metadata: {
          page,
          last: size > 0 ? Math.ceil(nbItems / size) : 0,
          quantity: Math.min(size, nbItems),
          total: nbItems,
        }
      }
    };
  } catch (err) {
    logError(`Error GET /api/invoice: ${err}`);
    return {
      statusCode: 500,
      error: "Internal Server Error",
    };
  };
}