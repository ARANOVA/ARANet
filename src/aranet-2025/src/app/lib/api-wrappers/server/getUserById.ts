'use server';

import { SingleResponse } from "@aranova/aranova-react-ui";
import { cookies } from "next/headers";

export const getUserById = async <T>(id?: number): Promise<SingleResponse<T>> => {
  try {
    const endpoint = id ? `/api/users/${id}` : '/api/me';
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
  } catch (err: unknown) {
    console.error(`Error fetching: ${err}`);
    return {
      statusCode: 500,
      data: null,
      error: (err as Error).message ?? String(err),
    };
  }
};
