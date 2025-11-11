import { enumGetModel } from "@/app/data";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";

export const getById = async <T>(
  prisma: PrismaClient,
  model: enumGetModel,
  id: number,
): Promise<T | null> => {
  const modelMap: Record<enumGetModel, any> = {
    contact: prisma.aranet_contact,
    client: prisma.aranet_client,
    vendor: prisma.aranet_vendor,
    project_status: prisma.aranet_project_status,
    user_profile: prisma.sf_guard_user_profile,
    user: prisma.sf_guard_user,
    kind_of_company: prisma.aranet_kind_of_company,
    budget_status: prisma.aranet_budget_status,
    invoice_category: prisma.aranet_invoice_category,
    payment_condition: prisma.aranet_payment_condition,
    project: prisma.aranet_project,
    payment_status: prisma.aranet_payment_status,
    expense_category: prisma.aranet_expense_category,
    income_category: prisma.aranet_income_category,
    expense: prisma.aranet_expense_item,
    invoice: prisma.aranet_invoice,
    timesheet: prisma.aranet_timesheet,
    budget: prisma.aranet_budget,
    income: prisma.aranet_income_item,
    kind_of_invoice: prisma.aranet_kind_of_invoice,
    payment_method: prisma.aranet_payment_method,
    invoice_prev: prisma.aranet_invoice,
  };

  if (!id) return null;

  try {
    const fn = modelMap[model];

    const whereClause =
      model === "user_profile" ? { user_id: id } : { id };

    const data = await (fn as any).findFirst({ where: whereClause });
    return data ? (data as T) : null;
  } catch (err) {
    logError(`Error GET /api/[model]/id: ${err}`);
    return null;
  }
};
