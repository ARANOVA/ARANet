import { SingleResponse } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";
import { aranet_invoice_verifactu } from "@/interfaces";

export const sendInvoice = async (
  data: aranet_invoice_verifactu,
): Promise<SingleResponse<void>> => {
  try {
    const res = await fetch('/api/verifactu/send', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
