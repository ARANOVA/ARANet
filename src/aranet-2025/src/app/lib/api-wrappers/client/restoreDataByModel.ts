import { SingleResponse } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";

export const restoreDataByModel = async (
  model: string,
  ids: number[],
): Promise<SingleResponse<void>> => {
  if (!ids || !model) return {
    statusCode: 400,
    data: null,
    error: 'No ids found',
  }
  const endpoint = `/api/${model}/${ids.join(",")}`;

  try {
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deleted_at: null,
        deleted_by: null,
      }),
    });
    const json = await res.json();
    return json as SingleResponse<void>;
  } catch (err) {
    logError(`Error patching ${endpoint}: ${err}`);
    return {
      statusCode: 500,
      data: null,
      error: (err as Error).toString(),
    };
  }
};
