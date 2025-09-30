import { SessionPayload } from "@/interfaces";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { enumDeleteModel } from "@/app/data";

export const restoreById = async (
  prisma: PrismaClient,
  session: SessionPayload | null,
  model: enumDeleteModel,
  ids: number[],
): Promise<SingleResponse<void>> => {
  const modelMap: Record<enumDeleteModel, any> = {
    contact: prisma.aranet_contact,
    client: prisma.aranet_client,
    vendor: prisma.aranet_vendor,
    project: prisma.aranet_project,
    expense: prisma.aranet_expense_item,
    timesheet: prisma.aranet_timesheet,
    budget: prisma.aranet_budget,
    invoice: prisma.aranet_invoice,
    income: prisma.aranet_income_item,
    invoice_item: prisma.aranet_invoice_item,
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
        deleted_at: null,
        deleted_by: null,
    };
    const x = await (fn as any).updateMany({
      where: { id: {
        in: ids.map(i => i)
      } },
      data
    });
    return { statusCode: 204 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Revisar el mensaje si no existe el id que se pasa
    logError(`Error POST (RESTORE) /api/graphtql (${model}): ${err}`);
    return { statusCode: 500, error: 'Error inexperado'};
  };
}
