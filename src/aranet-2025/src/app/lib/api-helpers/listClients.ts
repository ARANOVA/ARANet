import { ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { logDebug, logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { CLIENT_VALID_FIELDS, CLIENT_TEXT_FIELDS } from "@/app/data/client";
import { parseFilter, searchWhere } from "./utils";
import { aranet_client_join_contacts } from "@/interfaces";

const filterByValidFields = (filter: SearchDTO) => {
  return CLIENT_VALID_FIELDS.includes(filter.field.toLowerCase()) || filter.field === 'all';
};


export const listClients = async (
  prisma: PrismaClient,
  page: number,
  size: number,
  sortField: string,
  sortDir: 'asc' | 'desc',
  search: SearchDTO[],
  filters: string[],
): Promise<ListResponse<aranet_client_join_contacts>> => {
  search = search.filter(filter => filterByValidFields(filter))
  logDebug(`GET /api/client - Búsquedas encontradas: ${JSON.stringify(search)}`);
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
    searchWhere(where, search, CLIENT_TEXT_FIELDS);
    logDebug(`GET /api/client - Where generado: ${JSON.stringify(where)}`);

    const orderBy: Record<string, string> = {};
    orderBy[sortField] = sortDir;
    const nbItems = await prisma.aranet_client.count({ where });
    if (size === -1) {
      size = nbItems;
      page = 1;
    }
    let start = (page - 1) * size;
    if (start > 0 && start >= nbItems) {
      start = (Math.ceil(nbItems / size) - 1) * size;
    }
    if (size > nbItems) size = nbItems;
    const clients = await prisma.aranet_client.findMany({
      where,
      orderBy,
      skip: start,
      take: size,
    });
    if (!clients) {
      return {
        statusCode: 400,
        error: "Bad Request",
      };
    }

    // TODO: Join contacts

    return {
      statusCode: 200,
      data: {
        items: clients,
        metadata: {
          page,
          last: size > 0 ? Math.ceil(nbItems / size) : 0,
          quantity: Math.min(size, nbItems),
          total: nbItems,
        }
      }
    };
  } catch (err) {
    logError(`Error GET /api/client: ${err}`);
    return {
      statusCode: 500,
      error: "Internal Server Error",
    };
  };
}