import { enumSimpleListModel } from "@/app/data";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { WhereInput } from "@aranova/aranova-react-ui";

export const listById = async <T>(
  prisma: PrismaClient,
  model: enumSimpleListModel,
  where: WhereInput,
): Promise<T[] | null> => {
  const modelMap: Record<enumSimpleListModel, any> = {
    expense_item: prisma.aranet_expense_item,
    invoice_item: prisma.aranet_invoice_item,
    user_profile:prisma.sf_guard_user_profile,
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
