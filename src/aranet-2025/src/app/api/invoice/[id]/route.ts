import { SingleResponse } from '@aranova/aranova-react-ui';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma';
import { logError, logWarn } from '@/app/lib/logger';
import { isValidId } from '@/utils';
import { aranet_invoice_join_client } from '@/interfaces';
import { getSession } from '@/app/lib/session';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse<SingleResponse<aranet_invoice_join_client>>> {
  const { id } = await params;

  try {
    if (!isValidId(id)) {
      logWarn('GET /api/invoice/[id]: Intento de acceso inválido');
      return NextResponse.json({
        statusCode: 400,
        error: "Bad Request",
      }, { status: 400 });
    }
    const invoice = await prisma.aranet_invoice.findUnique({
      where: {
        id: parseInt(id, 10),
        // deleted_at: null,
      },
      include: {
        aranet_client: true,
      }
    });
    if (!invoice) {
      return NextResponse.json({
        statusCode: 404,
        error: "Not Found",
      }, { status: 404 });
    }
    return NextResponse.json({
      statusCode: 200,
      data: invoice,
    });
  } catch (err) {
    logError(`Error GET /api/invoice/${id}: ${err}`);
    return NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse<SingleResponse<void>>> {
  const cookie = await getSession();
  if (!cookie) {
    return NextResponse.json({
      statusCode: 401,
      error: "Unauthorized",
    }, { status: 401 });
  }
    
  const { id } = await params;
  try {
    const ids = id.split(',');
    const isOk = ids.reduce((prev, id) => {
      return prev && isValidId(id);
    }, true);
    if (!isOk) {
      logWarn(`Error DELETE /api/invoice/[id]: Intento de acceso inválido`);
      return NextResponse.json({
        statusCode: 400,
        error: "Bad Request",
      }, { status: 400 });
    }

    await prisma.aranet_invoice.updateMany({
      where: {
        id: {
          in: ids.map(id => parseInt(id, 10)),
        },
      },
      data: {
        deleted_at: new Date(),
        deleted_by: cookie.id,
      },

    });


    return NextResponse.json({
      statusCode: 201,
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.toString().indexOf('No record was found for a delete') > -1) {
      return NextResponse.json({
        statusCode: 201,
        data: null,
      });
    }
    logWarn(`Error DELETE /api/invoice/${id}: ${err}`);
    return NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  }
}

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
