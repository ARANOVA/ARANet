import { ExportData } from "@/interfaces";
import { SingleResponse } from "@aranova/aranova-react-ui";

export const exportDataByModel = async (
  model: string,
  ids: number[],
  exportData?: Record<string, unknown>
): Promise<SingleResponse<ExportData>> => {
  if (!ids || !model) return {
    statusCode: 400,
    data: null,
    error: 'No ids found',
  }
  const format = exportData?.format ?? 1;
  const endpoint = `/api/${model}/export/${format}`;
  const copyData = JSON.parse(JSON.stringify(exportData || {}));
  if (copyData.format) {
    delete copyData.format;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        ids,
        ...copyData
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log({res})
    const json = await res.json();
    return json as SingleResponse<ExportData>;
  } catch (err: unknown) {
    console.error(`Error exporting ${endpoint}: ${err}`);
    return {
      statusCode: 500,
      data: null,
      error: (err as Error).toString(),
    };
  }
};
