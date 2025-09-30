'use server';

import { SingleResponse } from "@aranova/aranova-react-ui";
import { cookies } from "next/headers";
import { logError, logWarn } from "../../logger";
import { UPDATE_QUERIES } from "@/graphql/queries";
import { isValidId } from "@/utils";

export const updateSingleDataByModel = async <T>(
  model: string,
  id?: number,
  data?: Partial<T>,
): Promise<SingleResponse<T>> => {
  if (!isValidId(id)) {
    logWarn(`UPDATE /api/graphql ${model}: Intento de acceso inválido. Id`);
    return {
      statusCode: 400,
      error: "Bad Request",
    };
  }
  if (!data) {
    logWarn(`UPDATE /api/graphql ${model}: Intento de acceso inválido. Data`);
    return {
      statusCode: 400,
      error: "Bad Request",
    };
  }
  
  const args: Record<string, unknown> = {
      id,
      data,
    };
  
    // TODO: Partir a variable search
    const query = (UPDATE_QUERIES as Record<any, string>)[model];
    if (!query) return { statusCode: 404, error: 'Query not found' };
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
      logError(`UPDATE /api/graphql ${model}: ${err}`);
      return {
        statusCode: 500,
        error: `${err}`,
      };
    }
  }