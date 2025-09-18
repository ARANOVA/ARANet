'use server';

import { QueryClient } from "@tanstack/react-query";
import { ListResponse, SingleResponse } from '@aranova/aranova-react-ui';
import { aranet_invoice_join_client_and_payment, User } from "@/interfaces";
import { getUserById, getSingleDataByModel, getRelationsByObjectAndObjectId } from "@/app/lib/api-wrappers/server";
import { aranet_address, aranet_client, aranet_contact, aranet_objectaddress, aranet_objectcontact } from "@/generated/prisma";

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

  async useInvoiceById(id: number): Promise<SingleResponse<aranet_invoice_join_client_and_payment>> {
    return this.queryClient.fetchQuery<SingleResponse<aranet_invoice_join_client_and_payment>>({
      queryKey: ['invoice', id],
      queryFn: () => getSingleDataByModel<aranet_invoice_join_client_and_payment>('invoice', id),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }

  async useAddressesByObjectAndObjectId(
    model: string,
    id: number
  ): Promise<ListResponse<(aranet_objectaddress & { aranet_address: aranet_address })>> {
    return this.queryClient.fetchQuery<ListResponse<(aranet_objectaddress & { aranet_address: aranet_address })>>({
      queryKey: ['address', model, id, 1, -1, 'objectaddress_is_default', 'desc'],
      queryFn: () => getRelationsByObjectAndObjectId<(aranet_objectaddress & { aranet_address: aranet_address })>('address', model, id, 1, -1, 'objectaddress_is_default', 'desc'),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }

  async useContactsByObjectAndObjectId(
    model: string,
    id: number
  ): Promise<ListResponse<(aranet_objectcontact & { aranet_contact: aranet_contact })>> {
    return this.queryClient.fetchQuery<ListResponse<(aranet_objectcontact & { aranet_contact: aranet_contact })>>({
      queryKey: ['contact', model, id, 1, -1, 'objectcontact_is_default', 'desc'],
      queryFn: () => getRelationsByObjectAndObjectId<(aranet_objectcontact & { aranet_contact: aranet_contact })>('contact', model, id, 1, -1, 'objectcontact_is_default', 'desc'),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }
}

export default ServerDataPlain;
