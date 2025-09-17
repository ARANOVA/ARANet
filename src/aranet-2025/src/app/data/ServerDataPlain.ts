'use server';

import { QueryClient } from "@tanstack/react-query";
import { SingleResponse } from '@aranova/aranova-react-ui';
import { aranet_invoice_join_client, User } from "@/interfaces";
import { getUserById, getSingleDataByModel } from "@/app/lib/api-wrappers/server";
import { aranet_client, aranet_invoice } from "@/generated/prisma";

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
      queryKey: ['users', id],
      queryFn: () => getUserById(),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }

  async useClientById(id: number): Promise<SingleResponse<aranet_client>> {
    return this.queryClient.fetchQuery<SingleResponse<aranet_client>>({
      queryKey: ['clients', id],
      queryFn: () => getSingleDataByModel('client', id),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }

  async useInvoiceById(id: number): Promise<SingleResponse<aranet_invoice_join_client>> {
    return this.queryClient.fetchQuery<SingleResponse<aranet_invoice_join_client>>({
      queryKey: ['invoices', id],
      queryFn: () => getSingleDataByModel<aranet_invoice_join_client>('invoice', id),
      retry: 3,
      staleTime: 1000 * 60 * 15, // 15 minutos
    });
  }
}

export default ServerDataPlain;
