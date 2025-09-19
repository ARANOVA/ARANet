import { ListResponse } from "@aranova/aranova-react-ui";
import { logError, logWarn } from "../logger";
import { aranet_invoice, PrismaClient } from "@/generated/prisma";

function filterByValidFields(filter: string, arg1: string): boolean {
  return true;
}

export const listInvoices = async (
  prisma: PrismaClient,
  page: number,
  size: number,
  sortField: string,
  sortDir: 'asc' | 'desc',
  search: string[],
  filters: string[],
): Promise<ListResponse<aranet_invoice>> => {
  
  let busquedasEncontradas = search;
  if (search.length > 1) {
    busquedasEncontradas = search.filter((filter) => filterByValidFields(filter, ':'));
    if (busquedasEncontradas.length === 0) {
      logWarn('GET /api/invoice - No se encontraron busquedas válidas, buscando por texto');
      busquedasEncontradas = search
    }
  }

  const filtrosEncontrados = filters.filter((filter) => filterByValidFields(filter, '|||'));

  // TODO: CREAR CONSULTAS DE BUSQUEDA

  // TODO: CREAR FILTROS
  const filtrosExtra: unknown[] = []; // buildFiltrosExtra(filtrosEncontrados, CALENDARIO_MAPSORT);
  logWarn(`GET /api/invoice - Filtros encontrados: ${JSON.stringify(filtrosEncontrados)}, filtros extra: ${JSON.stringify(filtrosExtra)}`);

  try {
    const where = {
      AND: [
        { deleted_at: null },
        ...filtrosEncontrados.map(f => {
          const aux = f.split('|||');
          const filter: Record<string, unknown> = {};
          filter[aux[0]] = aux[1];
          return filter;
        })
      ]
    };
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