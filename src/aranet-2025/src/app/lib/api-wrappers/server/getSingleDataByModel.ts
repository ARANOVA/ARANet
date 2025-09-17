'use server';

import { SingleResponse } from "@aranova/aranova-react-ui";
import { cookies } from "next/headers";
import { logError } from "../../logger";

export const getSingleDataByModel = async <T>(model: string, id: number): Promise<SingleResponse<T>> => {
  try {
    let res;
    if (typeof process !== 'undefined') {
      // Server
      const cookieStore = await cookies();
      const session = cookieStore.get('session');
      const init = {
        headers: {
          cookie: `${session?.name}=${session?.value}`
        }
      };
      res = await fetch(`${process.env.APP_BASE_URL}/api/${model}/${id}`, init);
    } else {
      // Cliente
      res = await fetch(`/api/${model}/${id}`);
    }

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const json = await res.json() as SingleResponse<T>;

    return json;
  } catch (err) {
    logError(`Error getSingleDataByModel /api/${model}/${id}: ${err}`);
    return {
      statusCode: 500,
      data: null,
      error: (err as Error).message ?? String(err),
    };
  }
};