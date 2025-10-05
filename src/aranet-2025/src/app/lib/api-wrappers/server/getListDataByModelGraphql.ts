'use server';

import { ListResponse, SearchDTO, WhereInput } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";
import { LIST_QUERIES } from '@/graphql/queries';
import { cookies } from "next/headers";

  
export const getListDataByModelGraphql = async <T>(
  model: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  taxonomy = "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  status = "",
  page = 1,
  limit = 3,
  sortField = '',
  sortDir: '' | 'asc' | 'desc' = '',
  searches: SearchDTO[] = [],
  filters: WhereInput | null = null,
): Promise<ListResponse<T>> => {
  const args: Record<string, unknown> = {
    page,
    size: limit,
  };
  if (sortField && sortDir) {
    args.sortField = sortField;
    args.sortDir = sortDir;
  }
  if (searches && searches.length > 0) {
    args.search = searches;
  }
  if (filters && Object.keys(filters).length > 0) {
    args.filters = filters;
  }

  // TODO: Partir a variable search
  const query = (LIST_QUERIES as Record<any, string>)[model];
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
      return json as ListResponse<T>;
    }
    const keys = Object.keys(json.data);
    return json.data[keys[0]] as ListResponse<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logError(`POST /api/graphql ${model}: ${err}`);
    return {
      statusCode: 500,
      error: `${err}`,
    };
  }
}