import { SingleResponse } from "@aranova/aranova-react-ui";

export const deleteDataByModel = async (
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
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    return json as SingleResponse<void>;
  } catch (err: unknown) {
    console.error(`Error deleting ${endpoint}: ${err}`);
    return {
      statusCode: 500,
      data: null,
      error: (err as Error).toString(),
    };
  }
};
