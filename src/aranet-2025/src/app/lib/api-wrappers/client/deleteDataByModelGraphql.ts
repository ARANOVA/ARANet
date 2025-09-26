import { DELETE_QUERIES } from "@/graphql/queries";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";

export const deleteDataByModelGraphql = async (
  model: string,
  ids: number[],
): Promise<SingleResponse<void>> => {
  if (!ids || !model) return {
    statusCode: 400,
    data: null,
    error: 'No ids found',
  }

  const query = (DELETE_QUERIES as Record<any, string>)[model];
  try {
    const res = await fetch('/api/graphql', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { ids } }),
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
    logError(`Error fetching api/graphql ${query}: ${err}`);
    return {
      statusCode: 500,
      error: `${err}`,
    };
  }
};
