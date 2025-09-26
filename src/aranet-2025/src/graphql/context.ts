import type { PrismaClient } from "@/generated/prisma"
import { SessionPayload } from "@/interfaces";

export type GraphQLContext = {
  prisma: PrismaClient;
  session: SessionPayload | null;
}
