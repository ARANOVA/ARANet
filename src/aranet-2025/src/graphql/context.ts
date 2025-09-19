import type { PrismaClient } from "@/generated/prisma"

export type GraphQLContext = {
  prisma: PrismaClient;
}
