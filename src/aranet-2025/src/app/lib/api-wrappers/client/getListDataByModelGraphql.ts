import { WhereInput, ListResponse, SearchDTO } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";
import { LIST_QUERIES } from "@/graphql/queries";

export const getListDataByModelGraphql = async <T>(
  model: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  taxonomy = "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  status = "",
  page = 1,
  limit = 3,
  sortField = "",
  sortDir: "" | "asc" | "desc" = "",
  searches: SearchDTO[] = [],
  filters: WhereInput | null
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
  const where: any = { AND: [] };

  if (filters && Object.keys(filters).length > 0) {
    console.log("FILTROS DENTRO DE GETLISTDATABYMODEL: ", filters, model);
  
    for (const [key, value] of Object.entries(filters)) {
      if (value === undefined) continue;
  
      if (typeof value === "object" && "operator" in value && "value" in value) {
        let operator = value.operator;
        let val = value.value;
  
        if (operator === "like") {
          operator = "equals";
        }
  
        where.AND.push({
          [value.field]: { [operator]: val },
        });
      } else {
        where.AND.push({
          [key]: { equals: value },
        });
      }
    }
  
    console.log(JSON.stringify(where, null, 2));
    args.filters = where;
  }
  
  
  //filterWhere(where, filters);

  // TODO: Partir a variable search
  const query = (LIST_QUERIES as Record<any, string>)[model];
  if (!query) return { statusCode: 404, error: "Query not found" };
  try {
    const res = await fetch("/api/graphql", {
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
    logError(`POST /api/graphql ${model}: ${err}`);
    return {
      statusCode: 500,
      error: `${err}`,
    };
  }
};
