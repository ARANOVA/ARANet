import { GraphQLContext } from "../context";
import { enumGetModel } from "@/app/data";
import { getById } from "@/app/lib/api-helpers";

export const createGetQuery =
  <T>(model: enumGetModel ) =>
  async (
    _: unknown,
    { id }: { id: number },
    context: GraphQLContext,
  ) => {
    const data = await getById<T>(context.prisma, model, id);
    if (data === null) {
      return {
        statusCode: 404,
        error: 'not found'
      }
    }
    return {
      statusCode: 200,
      data,
    }
  };
