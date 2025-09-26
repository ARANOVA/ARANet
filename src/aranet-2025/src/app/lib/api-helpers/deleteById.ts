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
  'cash'
;

export const deleteById = async (
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

    await (fn as any).deleteMany({
      where: { id: { in: ids } },
    });
    return { statusCode: 204 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.toString().indexOf('No record was found for a delete') === -1) {
      logError(`Error DELETE /api/graphtql (${model}): ${err}`);
      return { statusCode: 500, error: 'Error inexperado'};
    }
    return { statusCode: 204 };
  };
}
