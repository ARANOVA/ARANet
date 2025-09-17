import { SingleResponse } from '@aranova/aranova-react-ui';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma';
import { aranet_client } from '@/generated/prisma';
import { logError, logWarn } from '@/app/lib/logger';
import { isValidId } from '@/utils';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse<SingleResponse<aranet_client>>> {
  const { id } = await params;

  try {
    if (!isValidId(id)) {
      logWarn('GET /api/client/[id]: Intento de acceso inválido');
      return NextResponse.json({
        statusCode: 400,
        error: "Bad Request",
      }, { status: 400 });
    }
    const client = await prisma.aranet_client.findUnique({where: { id: parseInt(id, 10) }});
    if (!client) {
      return NextResponse.json({
        statusCode: 404,
        error: "Not Found",
      }, { status: 404 });
    }
    return NextResponse.json({
      statusCode: 200,
      data: client,
    });
  } catch (err) {
    logError(`Error GET /api/client/${id}: ${err}`);
    return NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  }
}

// export async function DELETE(
//   req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse<SingleResponse<void>>> {
//   try {
//     const { id } = await params;
//     const ids = id.split(',');
//     const isOk = ids.reduce((prev, id) => {
//       return prev && isValidId(id);
//     }, true);
//     if (!isOk) {
//       logWarn(`Error DELETE /api/calendarios/[id]: Intento de acceso inválido`);
//       return badRequest();
//     }

//     await Promise.all(
//       ids.map(id =>
//         prisma.calendario.delete({
//           where: { IdCalendario: parseInt(id, 10) },
//         })
//       )
//     );

//     return ok();
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     if (err.toString().indexOf('No record was found for a delete') > -1) {
//       return ok();
//     }
//     logWarn(`Error DELETE /api/calendarios/[id]: ${err}`);
//     return interalError();
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: Params
// ): Promise<
//   NextResponse<SingleResponse<{ IdCalendario: number; Nombre: string }>>
// > {
//   const { id } = await params;
//   try {
//     if (!isValidId(id)) {
//       logWarn('PUT /api/calendarios/[id]: Intento de acceso inválido');
//       return badRequest();
//     }
//     const body: CalendarData = await request.json();
//     // TODO: Validar con DTO

//     console.log('estos son los params del PUT: ', id, body.Nombre);
//     const respuesta = await prisma.calendario.update({
//       where: { IdCalendario: Number(id) },
//       data: { Nombre: body.Nombre },
//       // data: body
//     });

//     return NextResponse.json(
//       {
//         statusCode: 201,
//         data: {
//           IdCalendario: respuesta.IdCalendario,
//           Nombre: respuesta.Nombre,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     logError(`Error PUT /api/calendarios/[id]: ${err}`);
//     return interalError();
//   }
// }
