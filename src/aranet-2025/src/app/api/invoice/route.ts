import { ListResponse, SingleResponse } from "@aranova/aranova-react-ui";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma';
import { logError, logWarn } from "@/app/lib/logger";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ListResponse<unknown>>> {

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const sortField = url.searchParams.get('sortField') || 'anio';
  const sortDir = url.searchParams.get('sortDir') || 'desc';
  const start = (page - 1) * limit;
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
    // const cals = await obtenerCalendarios(
    //   sortField,
    //   sortDir,
    //   limit,
    //   start,
    //   busquedaExtra,
    //   filtrosExtra
    // );

    return NextResponse.json({
      statusCode: 200,
      data: {
        items: [] as unknown[],
        metadata: {
          last: 1,
          page: 1,
          total: 0,
          quantity: 10,
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

