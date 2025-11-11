'use server';

import { SingleResponse } from "@aranova/aranova-react-ui";
import { cookies } from "next/headers";
import { logError } from "../../logger";

export const getUserById = async <T>(id?: number): Promise<SingleResponse<T>> => {
  const endpoint = id ? `/api/user/${id}` : '/api/me';
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
      res = await fetch(`${process.env.APP_BASE_URL}${endpoint}`, init);
    } else {
      // Cliente
      res = await fetch(endpoint);
    }

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const json = await res.json() as SingleResponse<T>;

    return json;
  } catch (err) {
    logError(`Error getSingleDataByModel ${endpoint}: ${err}`);
    return {
      statusCode: 500,
      data: null,
      error: (err as Error).message ?? String(err),
    };
  }
};
