import { ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { logDebug, logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { searchWhere } from "./utils";
import { enumListModel, getTextFields, getValidFields } from "@/app/data";

const filterByValidFields = (validFields: string[], filter: SearchDTO) => {
  return validFields.includes(filter.field.toLowerCase()) || filter.field === 'all';
};

export const listByModel = async <T>(
  prisma: PrismaClient,
  model: enumListModel,
  page: number,
  size: number,
  sortField: string,
  sortDir: 'asc' | 'desc',
  search: SearchDTO[],
  filters: string[],
): Promise<ListResponse<T>> => {
  const modelMap: Record<enumListModel, any> = {
    contact: prisma.aranet_contact,
    client: prisma.aranet_client,
    vendor: prisma.aranet_vendor,
    project: prisma.aranet_project,
    expense: prisma.aranet_expense_item,
    timesheet: prisma.aranet_timesheet,
    budget: prisma.aranet_budget,
    cash: prisma.aranet_cash_item,
    income: prisma.aranet_income_item,
    invoice: prisma.aranet_invoice,
    user: prisma.sf_guard_user,
    invoice_item: prisma.aranet_invoice_item,
  };

  const noIncludeDelete = ['invoice_item'];

  const validFields = getValidFields(model);
  search = search.filter(filter => filterByValidFields(validFields, filter))
  logDebug(`GET /api/graphql - ${model} - Búsquedas encontradas: ${JSON.stringify(search)}`);
  // const filtrosEncontrados = filters.filter((filter) => filterByValidFields(filter, '|||'));

  // TODO: CREAR FILTROS
  const filtrosExtra: unknown[] = []; // buildFiltrosExtra(filtrosEncontrados, CALENDARIO_MAPSORT);
  // logDebug(`GET /api/invoice - Filtros encontrados: ${JSON.stringify(filtrosEncontrados)}, filtros extra: ${JSON.stringify(filtrosExtra)}`);

  try {
    const where: any = noIncludeDelete.includes(model) ? { AND: [] } : {
      AND: [
         { deleted_at: null },
      ]
    };
    searchWhere(where, search, getTextFields(model));
    logDebug(`GET /api/graphql - ${model} - Where generado: ${JSON.stringify(where)}`);

    const orderBy: Record<string, string> = {};
    orderBy[sortField] = sortDir;
    const fn = modelMap[model];
    const nbItems = await (fn as any).count({ where });
    if (size === -1) {
      size = nbItems;
      page = 1;
    }
    let start = (page - 1) * size;
    if (start > 0 && start >= nbItems) {
      start = (Math.ceil(nbItems / size) - 1) * size;
    }
    if (size > nbItems) size = nbItems;
    const items = await (fn as any).findMany({ where, orderBy, skip: start, take: size });
    if (!items) {
      return {
        statusCode: 400,
        error: "Bad Request",
      };
    }

    return {
      statusCode: 200,
      data: {
        items,
        metadata: {
          page,
          last: size > 0 ? Math.ceil(nbItems / size) : 0,
          quantity: Math.min(size, nbItems),
          total: nbItems,
        }
      }
    };
  } catch (err) {
    logError(`Error GET /api/graphql - ${model}: ${err}`);
    return {
      statusCode: 500,
      error: "Internal Server Error",
    };
  };
}