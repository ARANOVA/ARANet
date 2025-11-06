'use client';

import { SingleResponse } from "@aranova/aranova-react-ui";
import { logError, logWarn } from "../../logger";
import { CREATE_QUERIES } from "@/graphql/queries";

export const createDataByModel = async(
  model: string,
  data: Record<string, unknown>,
): Promise<SingleResponse<void>> => {
  if (!data) {
    logWarn(`CREATE /api/graphql ${model}: Intento de acceso inválido. Data`);
    return {
      statusCode: 400,
      error: "Bad Request",
    };
  }
  
const args: Record<string, unknown> = {
  data,
};

console.log('crear data ');
  // TODO: Partir a variable search
  const query = (CREATE_QUERIES as Record<any, string>)[model];
  if (!query) return { statusCode: 404, error: 'Query not found' };
  try {
    console.log('en de create')

    let res;

      res = await fetch('/api/graphql', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, variables: args }),
      });
    const json = await res.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }
    if (json.error) {
      return json as SingleResponse<void>;
    }
    const keys = Object.keys(json.data);
    console.log('fin de create')
    return json.data[keys[0]] as SingleResponse<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logError(`CREATE /api/graphql ${model}: ${err}`);
    return {
      statusCode: 500,
      error: `${err}`,
    };
  }
}