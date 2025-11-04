'use server';

import { SingleResponse } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";
import { ID_QUERIES } from '@/graphql/queries';
import { cookies } from "next/headers";

  
export const getSingleDataByModelGraphql = async <T>(
  model: string,
  id: number,
): Promise<SingleResponse<T>> => {
  const args: Record<string, unknown> = {
    id,
  };

  // TODO: Partir a variable search
  const query = (ID_QUERIES as Record<any, string>)[model];
  if (!query) return { statusCode: 404, error: 'Query not found' } as SingleResponse<T>
  try {
    let res;
    if (typeof process !== 'undefined') {
      // Server
      const cookieStore = await cookies();
      const session = cookieStore.get('session');
      res = await fetch(`${process.env.APP_BASE_URL}/api/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: `${session?.name}=${session?.value}`
        },
        body: JSON.stringify({ query, variables: args }),
      });
    } else {
      res = await fetch('/api/graphql', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, variables: args }),
      });
    }
    const json = await res.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }
    if (json.error) {
      return json as SingleResponse<T>;
    }
    const keys = Object.keys(json.data);
    return json.data[keys[0]] as SingleResponse<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logError(`POST /api/graphql ${model}: ${err}`);
    return {
      statusCode: 500,
      error: `${err}`,
    };
  }
}