import { Prisma } from "@/generated/prisma";
import { SingleResponse } from "@aranova/aranova-react-ui";

export const getErrorAsSingleResponse = <T>(
  err: unknown
): SingleResponse<T> => {
  console.log({err, type: typeof err})
  if ((typeof err === 'object' && (err as any).code !== undefined) || err instanceof Prisma.PrismaClientKnownRequestError) {
    const error = err as Prisma.PrismaClientKnownRequestError;
    switch (error.code) {
      case "P2002":
        // Unique constraint failed
        return {
          statusCode: 409,
          error: `El valor del campo único ya existe (${error.meta?.target})`,
        };
      case "P2003":
        // Foreign key constraint failed
        return {
          statusCode: 400,
          error: `Referencia de clave foránea inválida (${error.meta?.field_name})`,
        };
      case "P2000":
        // Value too long for column
        return {
          statusCode: 400,
          error: `Valor demasiado largo para el campo ${error.meta?.column_name}`,
        };
      default:
        return {
          statusCode: 500,
          error: `Error de Prisma (${error.code})`,
        };
    }
  }

  // Otros errores (no de Prisma)
  return { statusCode: 500, error: "Error inesperado" };
};
