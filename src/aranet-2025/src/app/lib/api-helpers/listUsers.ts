import { ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { logDebug, logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { USER_VALID_FIELDS, USER_TEXT_FIELDS } from "@/app/data/user";
import { parseFilter } from "./utils";
import { sf_guard_user_join_profile } from "@/interfaces";

const filterByValidFields = (filter: SearchDTO) => {
  return USER_VALID_FIELDS.includes(filter.field.toLowerCase()) || filter.field === 'all';
};


export const listUsers = async (
  prisma: PrismaClient,
  page: number,
  size: number,
  sortField: string,
  sortDir: 'asc' | 'desc',
  search: SearchDTO[],
  filters: string[],
): Promise<ListResponse<sf_guard_user_join_profile>> => {

  const busquedasEncontradas: Record<string, string> = {};
  search = search.filter(filter => filterByValidFields(filter))

  logDebug(`GET /api/users - Búsquedas encontradas: ${JSON.stringify(busquedasEncontradas)}`);
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
    for (const s of search) {
      if (s.value === undefined) continue;

      if (s.field === "all") {
        // OR sobre TEXT_FIELDS
        where.AND.push({
          OR: USER_TEXT_FIELDS.map(field => ({
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
    const nbItems = await prisma.sf_guard_user.count({ where });
    if (size === -1) {
      size = nbItems;
      page = 1;
    }
    let start = (page - 1) * size;
    if (start > 0 && start >= nbItems) {
      start = (Math.ceil(nbItems / size) - 1) * size;
    }
    if (size > nbItems) size = nbItems;
    const users = await prisma.sf_guard_user.findMany({
      where,
      orderBy,
      skip: start,
      take: size,
      include: {
        sf_guard_user_profile_sf_guard_user_profile_user_idTosf_guard_user: true,
      }
    });
    if (!users) {
      return {
        statusCode: 400,
        error: "Bad Request",
      };
    }

    return {
      statusCode: 200,
      data: {
        items: users,
        metadata: {
          page,
          last: size > 0 ? Math.ceil(nbItems / size) : 0,
          quantity: Math.min(size, nbItems),
          total: nbItems,
        }
      }
    };
  } catch (err) {
    logError(`Error GET /api/users: ${err}`);
    return {
      statusCode: 500,
      error: "Internal Server Error",
    };
  };
}