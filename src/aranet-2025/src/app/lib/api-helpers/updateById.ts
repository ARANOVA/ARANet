import { SessionPayload } from "@/interfaces";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { enumUpdateModel } from "@/app/data";

export const updateById = async (
  prisma: PrismaClient,
  session: SessionPayload | null | Promise<SessionPayload | null>,
  model: enumUpdateModel,
  idSearch: number,
  data: unknown,
): Promise<SingleResponse<void>> => {
  const modelMap: Record<enumUpdateModel, any> = {
    invoice_item: prisma.aranet_invoice_item,
    invoice: prisma.aranet_invoice,
    user: prisma.sf_guard_user,
    user_profile: prisma.sf_guard_user_profile,
    vendor: prisma.aranet_vendor,
    client:prisma.aranet_client,
    contact:prisma.aranet_contact

  };

  if (!idSearch) {
    return { statusCode: 400, error: 'Necesitas enviar el id del registro a actualizar'};
  }

  const cookie = await session;
  if (!cookie) {
    return { statusCode: 401, error: 'Unauthorized'};
  }

  const whereClause = model === "user_profile" ? { user_id: idSearch } : { id: idSearch };
  try {
    const fn = modelMap[model];
    const x = await (fn as any).update({
      where:  whereClause ,
      data
    });
    return { statusCode: 204, data: x };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Revisar el mensaje si no existe el id que se pasa
    logError(`Error POST (UPDATE) /api/graphql (${model}): ${err}`);
    return { statusCode: 500, error: 'Error inexperado'};
  };
}
