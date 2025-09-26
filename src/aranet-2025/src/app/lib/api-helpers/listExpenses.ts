import { ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { logDebug, logError } from "../logger";
import { aranet_expense_item, PrismaClient } from "@/generated/prisma";
import { EXPENSE_VALID_FIELDS, EXPENSE_TEXT_FIELDS } from "@/app/data/expense";
import { searchWhere } from "./utils";

const filterByValidFields = (filter: SearchDTO) => {
  return EXPENSE_VALID_FIELDS.includes(filter.field.toLowerCase()) || filter.field === 'all';
};


export const listExpenses = async (
  prisma: PrismaClient,
  page: number,
  size: number,
  sortField: string,
  sortDir: 'asc' | 'desc',
  search: SearchDTO[],
  filters: string[],
): Promise<ListResponse<aranet_expense_item>> => {
  search = search.filter(filter => filterByValidFields(filter))
  logDebug(`GET /api/expense - Búsquedas encontradas: ${JSON.stringify(search)}`);
  // const filtrosEncontrados = filters.filter((filter) => filterByValidFields(filter, '|||'));

  // TODO: CREAR FILTROS
  const filtrosExtra: unknown[] = []; // buildFiltrosExtra(filtrosEncontrados, CALENDARIO_MAPSORT);
  // logDebug(`GET /api/invoice - Filtros encontrados: ${JSON.stringify(filtrosEncontrados)}, filtros extra: ${JSON.stringify(filtrosExtra)}`);

  try {
    const where: any = {
      AND: [
        { deleted_at: null },
      ]
    };
    searchWhere(where, search, EXPENSE_TEXT_FIELDS);
    logDebug(`GET /api/expense - Where generado: ${JSON.stringify(where)}`);

    const orderBy: Record<string, string> = {};
    orderBy[sortField] = sortDir;
    const nbItems = await prisma.aranet_expense_item.count({ where });
    if (size === -1) {
      size = nbItems;
      page = 1;
    }
    let start = (page - 1) * size;
    if (start > 0 && start >= nbItems) {
      start = (Math.ceil(nbItems / size) - 1) * size;
    }
    if (size > nbItems) size = nbItems;
    const expenses = await prisma.aranet_expense_item.findMany({
      where,
      orderBy,
      skip: start,
      take: size,
    });
    if (!expenses) {
      return {
        statusCode: 400,
        error: "Bad Request",
      };
    }

    return {
      statusCode: 200,
      data: {
        items: expenses,
        metadata: {
          page,
          last: size > 0 ? Math.ceil(nbItems / size) : 0,
          quantity: Math.min(size, nbItems),
          total: nbItems,
        }
      }
    };
  } catch (err) {
    logError(`Error GET /api/expense: ${err}`);
    return {
      statusCode: 500,
      error: "Internal Server Error",
    };
  };
}