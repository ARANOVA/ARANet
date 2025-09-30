import { FilterDTO, ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";
import { LIST_QUERIES } from '@/graphql/queries';

  
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
  filters: FilterDTO[] = [],
): Promise<ListResponse<T>> => {
  console.log({filters})
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
  if (filters && filters.length > 0) {
    args.filters = filters;
  }

  // TODO: Partir a variable search
  const query = (LIST_QUERIES as Record<any, string>)[model];
  if (!query) return { statusCode: 404, error: 'Query not found' };
  try {
      const res = await fetch('/api/graphql', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: args }),
      });
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
      logError(`UPDATE /api/graphql ${model}: ${err}`);
      return {
        statusCode: 500,
        error: `${err}`,
      };
    }
}