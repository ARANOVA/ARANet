import { ListResponse } from "@aranova/aranova-react-ui";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma';
import { logError } from "@/app/lib/logger";
import { aranet_objectaddress, aranet_address } from "@/generated/prisma";
import { toTitleCase } from "@/utils";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ListResponse<aranet_objectaddress & { aranet_address: aranet_address }>>> {
  const url = new URL(request.url);
  let page = parseInt(url.searchParams.get('page') || '1');
  let size = parseInt(url.searchParams.get('limit') || '10');
  const objectaddress_object_class = url.searchParams.get('objectaddress_object_class') || '';
  const objectaddress_object_id = parseInt(url.searchParams.get('objectaddress_object_id') || '10');
  const sortField = url.searchParams.get('sortField') || 'objectaddress_is_default';
  const sortDir = url.searchParams.get('sortDir') || 'desc';
  
  try {
    const where = {
      objectaddress_object_class: toTitleCase(objectaddress_object_class),
      objectaddress_object_id
    };
    const orderBy: Record<string, string> = {};
    orderBy[sortField] = sortDir;
    const nbItems = await prisma.aranet_objectaddress.count({ where });
    if (size === -1) {
      size = nbItems;
      page = 1;
    }
    let start = (page - 1) * size;
    if (start > 0 && start >= nbItems) {
      start = (Math.ceil(nbItems / size) - 1) * size;
    }
    if (size > nbItems) size = nbItems;
    const addresses = await prisma.aranet_objectaddress.findMany({
      where,
      orderBy,
      skip: start,
      take: size,
      include: {
        aranet_address: true,
      }
    });
    if (!addresses) {
      return NextResponse.json({
        statusCode: 400,
        error: "Bad Request",
      }, { status: 400 });
    }

    return NextResponse.json({
      statusCode: 200,
      data: {
        items: addresses,
        metadata: {
          page,
          last: size > 0 ? Math.ceil(nbItems / size) : 0,
          quantity: Math.min(size, nbItems),
          total: nbItems,
        }
      }
    });
  } catch (err) {
    logError(`Error GET /api/address: ${err}`);
    return NextResponse.json({
      statusCode: 500,
      error: "Internal Server Error",
    }, { status: 500 });
  };
}

