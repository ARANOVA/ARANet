import { SessionPayload } from "@/interfaces";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { enumCreateModel } from "@/app/data";
import { sf_guard_user_profile } from "../../../generated/prisma/index";

export const createData = async (
  prisma: PrismaClient,
  session: SessionPayload | null | Promise<SessionPayload | null>,
  model: enumCreateModel,
  data: unknown
): Promise<SingleResponse<void>> => {
  const modelMap: Record<enumCreateModel, any> = {
    invoice_item: prisma.aranet_invoice_item,
    user: prisma.sf_guard_user,
    user_profile: prisma.sf_guard_user_profile,
  };

  const cookie = await session;
  if (!cookie) {
    return { statusCode: 401, error: "Unauthorized" };
  }

  try {
    const fn = modelMap[model];
    const x = await (fn as any).create({
      data,
    });
    return { statusCode: 204, data: x };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Revisar el mensaje si no existe el id que se pasa
    logError(`Error POST (CREATE) /api/graphtql (${model}): ${err}`);
    return { statusCode: 500, error: "Error inexperado" };
  }
};
