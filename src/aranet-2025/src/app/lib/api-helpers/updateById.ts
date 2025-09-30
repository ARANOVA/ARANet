import { SessionPayload } from "@/interfaces";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { enumUpdateModel } from "@/app/data";

export const updateById = async (
  prisma: PrismaClient,
  session: SessionPayload | null,
  model: enumUpdateModel,
  id: number,
  data: unknown,
): Promise<SingleResponse<void>> => {
  const modelMap: Record<enumUpdateModel, any> = {
    invoice_item: prisma.aranet_invoice_item,
  };

  if (!id) {
    return { statusCode: 400, error: 'Necesitas enviar el id del registro a actualizar'};
  }

  const cookie = await session;
  if (!cookie) {
    return { statusCode: 401, error: 'Unauthorized'};
  }
    
  try {
    const fn = modelMap[model];
    const x = await (fn as any).update({
      where: { id },
      data
    });
    return { statusCode: 204, data: x };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Revisar el mensaje si no existe el id que se pasa
    logError(`Error POST (UPDATE) /api/graphtql (${model}): ${err}`);
    return { statusCode: 500, error: 'Error inexperado'};
  };
}
