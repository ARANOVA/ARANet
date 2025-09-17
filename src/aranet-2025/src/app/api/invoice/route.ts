import { ListResponse, SingleResponse } from "@aranova/aranova-react-ui";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma';
import { logError, logWarn } from "@/app/lib/logger";
import { aranet_invoice } from "@/generated/prisma";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ListResponse<aranet_invoice>>> {

  const url = new URL(request.url);
  let page = parseInt(url.searchParams.get('page') || '1');
  let size = parseInt(url.searchParams.get('limit') || '10');
  const sortField = url.searchParams.get('sortField') || 'invoice_date';
  const sortDir = url.searchParams.get('sortDir') || 'asc';
  //BUSQUEDAS
  const search = url.searchParams.getAll('search[]');
  const f = url.searchParams.getAll('filter[]');

  let busquedasEncontradas = search;
  if (search.length > 1) {
    busquedasEncontradas = search.filter((filter) => filterByValidFields(filter, ':'));
    if (busquedasEncontradas.length === 0) {
      logWarn('GET /api/invoice - No se encontraron busquedas válidas, buscando por texto');
      busquedasEncontradas = search
    }
  }

  const filtrosEncontrados = f.filter((filter) => filterByValidFields(filter, '|||'));

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
      return NextResponse.json({
        statusCode: 400,
        error: "Bad Request",
      }, { status: 400 });
    }

    return NextResponse.json({
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
    });
  } catch (err) {
    logError(`Error GET /api/invoice: ${err}`);
    return NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  };
}




const TIPODIAS = [
  'blank',
  'festivo',
  'baja',
  "propio",
  "vacaciones",
  "laboral",
  "medico",
  "otros",
  "otros-dia",
  "baja-abierta",
  "libre",
  "redad",
  "descanso"
];

export async function auxInsertCalendarItem(
  idCalendario: number,
  ev: CalEvent
) {
  try {
    const aux = calendarItemToSQLProcArgs(idCalendario, ev);
    const SQL = `EXEC dbo.InsertCalendarItem ${aux.join(', ')}`;
    logSQL(`SQL de insertCalendarItem: ${SQL}`);
    const result = await prisma.$queryRawUnsafe(SQL);
    return result;
  } catch (err) {
    logError(`Error insertCalendarItem: ${err}`);
    throw err;
  }
}

export async function insertCalendarItem(
  idCalendario: number,
  evs: CalEvent[] | null,
): Promise<void> {
  if (!evs || evs.length === 0) return;

  for (const ev of evs) {
    await auxInsertCalendarItem(idCalendario, ev);
  }
}


// POST /api/calendarios
export async function POST(
  req: NextRequest,
): Promise<NextResponse<SingleResponse<{ IdCalendario: number; Nombre: string; }>>> {
  try {
    const data = await req.json() as CalendarData;

    // Insertar calendario
    const aux = calendarPostToSQLProcArgs(data);
    const SQL = `EXEC dbo.InsertCalendar ${aux.join(', ')}`;
    logSQL(`SQL de insertCalendar: ${SQL}`);

    const result: { '': number }[] = await prisma.$queryRawUnsafe(SQL);
    const idCalendario = result[0][''];

    // Insertar items de calendario en serie
    for (const item of (data.data || [])) {
      await insertCalendarItem(idCalendario, item);
    }

    // Preparar nombre final
    const aux1 = data.Nombre.split("(");
    let nombre = data.Nombre;
    if (aux1.length > 1) {
      nombre = nombre[0].substring(0, aux1[0].length - 1);      
    }

    // Actualizar calendario final
    const SQLUpdate = `UPDATE Calendario 
           SET FechaAprobacion = getdate(), 
               TipoTemporal = ${data.TipoTemporal}, 
               Nombre = '${nombre}' 
           WHERE IdCalendario = ${idCalendario}`;

    logSQL(`SQLUpdate: ${SQLUpdate}`);
    await prisma.$queryRawUnsafe(SQLUpdate);

    logDebug(`POST /api/calendarios: Calendario insertado con id ${idCalendario}`);
    return NextResponse.json(
      {
        statusCode: 201,
        data: { IdCalendario: idCalendario, Nombre: nombre },
      }
    );
  } catch (err: unknown) {
    logError(`Error POST api/calendarios: ${err}`);
    return interalError();
  }
}
function filterByValidFields(filter: string, arg1: string): unknown {
  throw new Error("Function not implemented.");
}

