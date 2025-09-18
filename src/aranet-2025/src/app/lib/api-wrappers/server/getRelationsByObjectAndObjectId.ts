'use server';

import { ListResponse } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";
import { cookies } from "next/headers";

export const getRelationsByObjectAndObjectId = async <T>(
  rc: string,
  model: string,
  id: number,
  page = 1,
  limit = 3,
  sortField = '',
  sortDir: '' | 'asc' | 'desc' = '',
): Promise<ListResponse<T>> => {
  
  const endpoint = `/api/${rc}?object${rc}_object_class=${model}&object${rc}_object_id=${id}&page=${page}&limit=${limit}&sortField=${sortField}&sortDir=${sortDir}`;
  let res;
  try {
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
    const json = await res.json();
    return json as ListResponse<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logError(`Error fetching ${endpoint}: ${err}`);
    return {
      statusCode: 500,
      error: `${err}`,
    };
  }
};
