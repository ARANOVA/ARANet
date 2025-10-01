import { UPDATE_QUERIES } from "@/graphql/queries";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";
import { isValidId } from "@/utils";

export const updateDataByModelGraphql = async (
  model: string,
  id: number,
  data: Record<string, unknown>,
): Promise<SingleResponse<void>> => {
  if (!isValidId(id) || !model) return {
    statusCode: 400,
    data: null,
    error: 'No ids found',
  }

  const query = (UPDATE_QUERIES as Record<any, string>)[model];
  if (!query) return { statusCode: 404, error: 'Query not found' };
  try {
    const res = await fetch('/api/graphql', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { id, data } }),
    });
    const json = await res.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }
    if (json.error) {
      return json as SingleResponse<void>;
    }
    const keys = Object.keys(json.data);
    return json.data[keys[0]] as SingleResponse<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logError(`POST (UPDATE) /api/graphql ${model}: ${err}`);
    return {
      statusCode: 500,
      error: `${err}`,
    };
  }
};
