import { SessionPayload } from "@/interfaces";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { enumDeleteModel } from "@/app/data";

export const deleteSoftById = async (
  prisma: PrismaClient,
  session: SessionPayload | null | Promise<SessionPayload | null>,
  model: enumDeleteModel,
  ids: number[]
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
    user: prisma.sf_guard_user,
    user_profile: prisma.sf_guard_user_profile,
  };

  if ((ids || []).length === 0) {
    return { statusCode: 400, error: "Necesitas al menos un id para borrar" };
  }

  const cookie = await session;
  if (!cookie) {
    return { statusCode: 401, error: "Unauthorized" };
  }

  try {
    const fn = modelMap[model];
    const data: Record<string, unknown> = {
      deleted_at: new Date(),
      deleted_by: cookie.id,
    };
    if (model === "budget") {
      data.aranet_budget_is_last = 0;
    }
    const x = await (fn as any).updateMany({
      where: {
        id: {
          in: ids.map((i) => i),
        },
      },
      data,
    });
    if (x.count < ids.length) {
      return {
        statusCode: 500,
        error: "No se pudo borrar alguno de los registros",
      };
    }
    return { statusCode: 204 };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logError(`Error POST (SOFT DELETE) /api/graphtql (${model}): ${err}`);
    return { statusCode: 500, error: "Error inexperado" };
  }
};
