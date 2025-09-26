import { ListVariables } from "@aranova/aranova-react-ui";
import { GraphQLContext } from "../context";
import { listByModel } from "@/app/lib/api-helpers";
import { enumListModel } from "@/app/data";

export const createListQuery =
  (model: enumListModel, defaultSortField?: string, defaultSortDir: 'asc' | 'desc' = 'asc') =>
  async (
    _: unknown,
    {
      page = 1,
      size = 10,
      sortField = defaultSortField || 'id',
      sortDir = defaultSortDir,
      search = [],
      filters = [],
    }: ListVariables,
    context: GraphQLContext,
  ) => {
    return await listByModel(
      context.prisma,
      model,
      page,
      size,
      sortField,
      sortDir,
      search,
      filters,
    );
  };
