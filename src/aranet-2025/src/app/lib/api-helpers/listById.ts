import { enumSimpleListModel } from "@/app/data";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";

export const listById = async <T>(
  prisma: PrismaClient,
  model: enumSimpleListModel,
  where: Record<string, any>,
): Promise<T[] | null> => {
  const modelMap: Record<enumSimpleListModel, any> = {
    expense_item: prisma.aranet_expense_item,
    invoice_item: prisma.aranet_invoice_item,
  };

  try {
    const fn = modelMap[model];
    const data = await (fn as any).findMany({ where });
    return data ? data as T[] : null;
  } catch (err) {
    logError(`Error GET /api/[model]: ${err}`);
    return null;
  };
}
