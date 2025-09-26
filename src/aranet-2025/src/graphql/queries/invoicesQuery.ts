import { ListVariables } from "@aranova/aranova-react-ui";
import { GraphQLContext } from "../context";
import { listByModel } from "@/app/lib/api-helpers";

export const invoicesQuery = async (
  _: unknown,
  {
    page = 1,
    size = 10,
    sortField = 'client_company_name',
    sortDir = 'asc',
    search = [],
    filters = [],
  }: ListVariables,
  context: GraphQLContext,
) => {
  const resp = await listByModel(context.prisma, 'client', page, size, sortField, sortDir, search, filters);
  return resp;
}