import { SessionPayload } from "@/interfaces";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";

type enumModel =
  'client' |
  'vendor' |
  'expense' |
  'contact' |
  'project'
;

export const deleteById = async (
  prisma: PrismaClient,
  session: SessionPayload | null,
  model: enumModel,
  ids: number[],
): Promise<Error | void> => {
  const modelMap = {
    contact: prisma.aranet_contact,
    client: prisma.aranet_client,
    vendor: prisma.aranet_vendor,
    project: prisma.aranet_project,
    expense: prisma.aranet_expense_item,
  };

  if ((ids || []).length === 0) return new Error('Necesitas al menos un id para borrar');

  const cookie = await session;
    if (!cookie) {
      return new Error("Unauthorized");
    }
    
  try {
    const fn = modelMap[model];

    await (fn as any).updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        deleted_at: new Date(),
        deleted_by: cookie.id,
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Revisar el mensaje si no existe el id que se pasa
    if (err.toString().indexOf('No record was found for a delete') === -1) {
      logError(`Error DELETE /api/graphtql]: ${err}`);
      return new Error('Error inexperado');
    }
  };
}
