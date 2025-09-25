import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";
import { aranet_objectcontact_join_contact } from "@/interfaces";

export const listContacts = async (
  prisma: PrismaClient,
  model: string,
  id: number
): Promise<aranet_objectcontact_join_contact[]> => {
  try {
    const contacts = prisma.aranet_objectcontact.findMany({
      where: {
        objectcontact_object_class: model,
        objectcontact_object_id: id,
      },
      include: {
        aranet_contact: true,
      }
    });
    return contacts;
  } catch (err) {
    logError(`Error GET /api/contact: ${err}`);
    return [];
  };
}
