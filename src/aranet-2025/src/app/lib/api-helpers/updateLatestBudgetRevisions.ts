import { SessionPayload } from "@/interfaces";
import { logError } from "../logger";
import { PrismaClient } from "@/generated/prisma";

const setLastBudget = async (prisma: PrismaClient, id: number): Promise<void>  => {
  // 1️⃣ Recuperar el presupuesto inicial
  const budget = await prisma.aranet_budget.findUnique({
    where: { id },
    select: {
      id: true,
      budget_prefix: true,
      budget_number: true,
    },
  });

  if (!budget) {
    throw new Error(`No existe budget con id=${id}`);
  }

  // 2️⃣ Construir el filtro con prefix + number
  const filter = {
    budget_prefix: budget.budget_prefix,
    budget_number: budget.budget_number,
  };

  // 3️⃣ Transacción: resetear y marcar el último
  await prisma.$transaction(async (tx) => {
    // resetear todos
    await tx.aranet_budget.updateMany({
      where: filter,
      data: { budget_is_last: 0 },
    });

    // obtener el de mayor revision
    const lastBudget = await tx.aranet_budget.findFirst({
      where: filter,
      orderBy: { budget_revision: "desc" },
    });

    if (!lastBudget) return null;

    // marcar como último
    await tx.aranet_budget.update({
      where: { id: lastBudget.id },
      data: { budget_is_last: 1 },
    });
  });
}

export const updateLatestBudgetRevisions = async (
  prisma: PrismaClient,
  session: SessionPayload | null,
  ids: number[],
): Promise<Error | void> => {
  if ((ids || []).length === 0) return new Error('Necesitas al menos un id para actualizar');

  const cookie = await session;
  if (!cookie) {
    return new Error("Unauthorized");
  }
  
  const results: { id: number; status: string; error?: string }[] = [];
  const errors: string[] = [];

  for (const id of ids) {
    try {
      const result = await setLastBudget(prisma, id);
      results.push({ id, status: "updated" });
    } catch (error: any) {
      const msg = `Error en id ${id}: ${error.message}`;
      errors.push(msg);
      results.push({ id, status: "error", error: msg });
    }
  }
  // 👉 si hubo errores, lanza un Error general
  if (errors.length > 0) {
    logError(`Error UPDATE /api/graphtql: ${errors.join("\n")}`);
    return new Error('Error inexperado');
  }
}
