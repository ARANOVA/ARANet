import { ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma';
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
  // TODO: Voger SearchDTO's
  const search: SearchDTO[] = []; //url.searchParams.getAll('search[]');
  const filters = url.searchParams.getAll('filter[]');
  const resp = await listInvoices(prisma, page, size, sortField, sortDir as 'asc' | 'desc', search, filters);
  return NextResponse.json(resp, { status: resp.statusCode});
}

