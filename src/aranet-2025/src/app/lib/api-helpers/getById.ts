import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";

type enumModel =
  'client' |
  'vendor' |
  'contact' |
  'project_status' |
  'profile' |
  'kind_of_company' |
  'budget_status' |
  'invoice_category' |
  'payment_condition' |
  'project' |
  'payment_status' |
  'expense_category' |
  'income_category' |
  'expense'
;

export const getById = async <T>(
  prisma: PrismaClient,
  model: enumModel,
  id: number
): Promise<T | null> => {
  const modelMap = {
    contact: prisma.aranet_contact,
    client: prisma.aranet_client,
    vendor: prisma.aranet_vendor,
    project_status: prisma.aranet_project_status,
    profile: prisma.sf_guard_user_profile,
    kind_of_company: prisma.aranet_kind_of_company,
    budget_status: prisma.aranet_budget_status,
    invoice_category: prisma.aranet_invoice_category,
    payment_condition: prisma.aranet_payment_condition,
    project: prisma.aranet_project,
    payment_status: prisma.aranet_payment_status,
    expense_category: prisma.aranet_expense_category,
    income_category: prisma.aranet_income_category,
    expense: prisma.aranet_expense_item,
  };

  if (!id) return null;

  try {
    const fn = modelMap[model];

    const data = await (fn as any).findFirst({ where: { id } });
    return data ? data as T : null;
  } catch (err) {
    logError(`Error GET /api/[model]/id]: ${err}`);
    return null;
  };
}
