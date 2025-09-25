import { ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { logDebug, logError } from "../logger";
import { aranet_project, PrismaClient } from "@/generated/prisma";
import { PROJECT_VALID_FIELDS, PROJECT_TEXT_FIELDS } from "@/app/data/project";
import { searchWhere } from "./utils";

const filterByValidFields = (filter: SearchDTO) => {
  return PROJECT_VALID_FIELDS.includes(filter.field.toLowerCase()) || filter.field === 'all';
};

export const listProjects = async (
  prisma: PrismaClient,
  page: number,
  size: number,
  sortField: string,
  sortDir: 'asc' | 'desc',
  search: SearchDTO[],
  filters: string[],
): Promise<ListResponse<aranet_project>> => {
  search = search.filter(filter => filterByValidFields(filter))
  logDebug(`GET /api/project - Búsquedas encontradas: ${JSON.stringify(search)}`);
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
    searchWhere(where, search, PROJECT_TEXT_FIELDS);
    logDebug(`GET /api/project - Where generado: ${JSON.stringify(where)}`);

    const orderBy: Record<string, string> = {};
    orderBy[sortField] = sortDir;
    const nbItems = await prisma.aranet_project.count({ where });
    if (size === -1) {
      size = nbItems;
      page = 1;
    }
    let start = (page - 1) * size;
    if (start > 0 && start >= nbItems) {
      start = (Math.ceil(nbItems / size) - 1) * size;
    }
    if (size > nbItems) size = nbItems;
    const projectss = await prisma.aranet_project.findMany({
      where,
      orderBy,
      skip: start,
      take: size,
    });
    if (!projectss) {
      return {
        statusCode: 400,
        error: "Bad Request",
      };
    }

    return {
      statusCode: 200,
      data: {
        items: projectss,
        metadata: {
          page,
          last: size > 0 ? Math.ceil(nbItems / size) : 0,
          quantity: Math.min(size, nbItems),
          total: nbItems,
        }
      }
    };
  } catch (err) {
    logError(`Error GET /api/project: ${err}`);
    return {
      statusCode: 500,
      error: "Internal Server Error",
    };
  };
}