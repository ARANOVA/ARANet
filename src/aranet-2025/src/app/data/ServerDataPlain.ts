'use server';

import { QueryClient } from "@tanstack/react-query";
import { FilterDTO, ListResponse, SearchDTO, SingleResponse, WhereInput } from '@aranova/aranova-react-ui';
import { aranet_expense_item_join_all, aranet_invoice_join_all, User } from "@/interfaces";
import { getUserById, getSingleDataByModel, getRelationsByObjectAndObjectId, getSingleDataByModelGraphql, getListDataByModelGraphql } from "@/app/lib/api-wrappers/server";
import { aranet_address, aranet_client, aranet_contact, aranet_invoice, aranet_objectaddress, aranet_objectcontact } from "@/generated/prisma";

const empty = { statusCode: 200, data: { items: [], metadata: {
    page: 0,
    last: 0,
    quantity: 0,
    total: 0
  } }}

class ServerDataPlain {
  private static instance: ServerDataPlain;
  private queryClient: QueryClient;
  private intervalId: Record<string, NodeJS.Timeout | null> = {};
  private _promises: Record<string, Promise<unknown>> = {};

  private constructor() {
    this.queryClient = new QueryClient();
  }

  static getInstance(): ServerDataPlain {
    if (!ServerDataPlain.instance) {
      ServerDataPlain.instance = new ServerDataPlain();
    }
    return ServerDataPlain.instance;
  }

  getQueryClient(): QueryClient {
    return this.queryClient;
  }

  async useMe(id: number): Promise<SingleResponse<User>> {
    return this.queryClient.fetchQuery<SingleResponse<User>>({
      queryKey: ['user', id],
      queryFn: () => getUserById(),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }

  async useClientById(id: number): Promise<SingleResponse<aranet_client>> {
    return this.queryClient.fetchQuery<SingleResponse<aranet_client>>({
      queryKey: ['client', id],
      queryFn: () => getSingleDataByModel('client', id),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }

  async useInvoices(
    page = 1,
    limit = 10,
    sortField = 'invoice_date',
    sortDir: 'asc' | 'desc' = 'asc',
    searches: SearchDTO[] = [],
    filters: WhereInput | null = null,
): Promise<ListResponse<aranet_invoice_join_all>> {
    return this.queryClient.fetchQuery<ListResponse<aranet_invoice_join_all>>({
      queryKey: ['invoice'],
      queryFn: () => getListDataByModelGraphql<aranet_invoice_join_all>('invoice', '', '', page, limit, sortField, sortDir, searches, filters),
      retry: 3,
      staleTime: 0, //1000 * 60 * 5, // 5 minutos - no funciona la actualización
    });
  };

  async useInvoiceById(id: number): Promise<SingleResponse<aranet_invoice_join_all>> {
    return this.queryClient.fetchQuery<SingleResponse<aranet_invoice_join_all>>({
      queryKey: ['invoice', id],
      queryFn: () => getSingleDataByModelGraphql<aranet_invoice_join_all>('invoice', id),
      retry: 3,
      staleTime: 0, //1000 * 60 * 5, // 5 minutos - no funciona la actualización
    });
  }

  async useExpenseById(id: number): Promise<SingleResponse<aranet_expense_item_join_all>> {
    return this.queryClient.fetchQuery({
      queryKey: ['expense', id],
      queryFn: () => getSingleDataByModelGraphql<aranet_expense_item_join_all>('expense', id),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }

  async useAddressesByObjectAndObjectId(
    model: string,
    id: number | null
  ): Promise<ListResponse<(aranet_objectaddress & { aranet_address: aranet_address })>> {
    if (id === null) return empty;
    return this.queryClient.fetchQuery<ListResponse<(aranet_objectaddress & { aranet_address: aranet_address })>>({
      queryKey: ['address', model, id, 1, -1, 'objectaddress_is_default', 'desc'],
      queryFn: () => getRelationsByObjectAndObjectId<(aranet_objectaddress & { aranet_address: aranet_address })>('address', model, id, 1, -1, 'objectaddress_is_default', 'desc'),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }

  async useContactsByObjectAndObjectId(
    model: string,
    id: number | null,
  ): Promise<ListResponse<(aranet_objectcontact & { aranet_contact: aranet_contact })>> {
    if (id === null) return empty;
    return this.queryClient.fetchQuery<ListResponse<(aranet_objectcontact & { aranet_contact: aranet_contact })>>({
      queryKey: ['contact', model, id, 1, -1, 'objectcontact_is_default', 'desc'],
      queryFn: () => getRelationsByObjectAndObjectId<(aranet_objectcontact & { aranet_contact: aranet_contact })>('contact', model, id, 1, -1, 'objectcontact_is_default', 'desc'),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }
}

export default ServerDataPlain;
