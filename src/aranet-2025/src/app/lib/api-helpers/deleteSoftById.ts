import { SessionPayload } from "@/interfaces";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { SingleResponse } from "@aranova/aranova-react-ui";

type enumModel =
  'client' |
  'vendor' |
  'expense' |
  'contact' |
  'project' |
  'timesheet' |
  'budget' |
  'invoice' |
  'income' |
  'cash'
;

export const deleteSoftById = async (
  prisma: PrismaClient,
  session: SessionPayload | null,
  model: enumModel,
  ids: number[],
): Promise<SingleResponse<void>> => {
  const modelMap = {
    contact: prisma.aranet_contact,
    client: prisma.aranet_client,
    vendor: prisma.aranet_vendor,
    project: prisma.aranet_project,
    expense: prisma.aranet_expense_item,
    timesheet: prisma.aranet_timesheet,
    budget: prisma.aranet_budget,
    invoice: prisma.aranet_invoice,
    income: prisma.aranet_income_item,
    cash: prisma.aranet_cash_item,
  };

  if ((ids || []).length === 0) {
    return { statusCode: 400, error: 'Necesitas al menos un id para borrar'};
  }

  const cookie = await session;
  if (!cookie) {
    return { statusCode: 401, error: 'Unauthorized'};
  }
    
  try {
    const fn = modelMap[model];
    const data: Record<string, unknown> = {
        deleted_at: new Date(),
        deleted_by: cookie.id,
    };
    if (model === 'budget') {
      data.aranet_budget_is_last = 0;
    }

    const x = await (fn as any).updateMany({
      where: { id: {
        in: ids.map(i => i*100000)
      } },
      data
    });
    console.log({x})
    if (x.count < ids.length) {
      return { statusCode: 500, error: 'No se pudo borrar alguno de los registros'};
    }
    return { statusCode: 204 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Revisar el mensaje si no existe el id que se pasa
    logError(`Error DELETE /api/graphtql (${model}): ${err}`);
    return { statusCode: 500, error: 'Error inexperado'};
  };
}
