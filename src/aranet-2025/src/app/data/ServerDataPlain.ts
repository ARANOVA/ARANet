'use server';

import { QueryClient } from "@tanstack/react-query";
import { SingleResponse } from '@aranova/aranova-react-ui';
import { User } from "@/interfaces";
import { getUserById } from "@/app/lib/api-wrappers/server";

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
}

export default ServerDataPlain;
