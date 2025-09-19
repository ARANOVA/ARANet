import { ListResponse, SingleResponse } from "@aranova/aranova-react-ui";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma';
import { logError } from "@/app/lib/logger";
import { aranet_invoice } from "@/generated/prisma";
import { listInvoices } from "@/app/lib/api-helpers/listInvoices";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ListResponse<aranet_invoice>>> {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const size = parseInt(url.searchParams.get('limit') || '10');
  const sortField = url.searchParams.get('sortField') || 'invoice_date';
  const sortDir = url.searchParams.get('sortDir') || 'asc';
  //BUSQUEDAS
  const search = url.searchParams.getAll('search[]');
  const filters = url.searchParams.getAll('filter[]');
  const resp = await listInvoices(prisma, page, size, sortField, sortDir as 'asc' | 'desc', search, filters);
  return NextResponse.json(resp, { status: resp.statusCode});
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

