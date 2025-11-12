"use server";

import { SessionPayload } from "@/interfaces";
import { PrismaClient } from "@/generated/prisma";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { enumCreateModel } from "@/app/data";
import { createSalt, hmacCreatePassword } from "../session";
import { UserInsertFormDataDTO } from "@/app/data/user/zodDataUser";
import { getErrorAsSingleResponse } from "../helpers/server-errors";

export const createData = async <T>(
  prisma: PrismaClient,
  session: SessionPayload | null | Promise<SessionPayload | null>,
  model: enumCreateModel,
  data: T
): Promise<SingleResponse<T>> => {
  const modelMap: Record<enumCreateModel, any> = {
    invoice_item: prisma.aranet_invoice_item,
    user: prisma.sf_guard_user,
    user_profile: prisma.sf_guard_user_profile,
    vendor:prisma.aranet_vendor,
    client:prisma.aranet_client,
    contact:prisma.aranet_contact
  };

  const cookie = await session;
  if (!cookie) {
    return { statusCode: 401, error: "Unauthorized" };
  }

  try {
    let dataToCreate = data;

    if (model === "user") {
      const userData = { ...(data as unknown as UserInsertFormDataDTO) };
      if (userData.password) {
        userData.salt = createSalt();
        userData.algorithm = "SHA-512";
        userData.password = await hmacCreatePassword(
          userData.password,
          userData.salt
        );
      }
      dataToCreate = userData as T;
    }

    const fn = modelMap[model];
    const created = await (fn as any).create({ data: dataToCreate });

    return {
      statusCode: 201,
      data: created,
    };
  } catch (err: any) {
    return getErrorAsSingleResponse<T>(err);
  }
};
