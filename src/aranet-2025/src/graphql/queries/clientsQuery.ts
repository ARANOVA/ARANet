import { ListVariables } from "@aranova/aranova-react-ui";
import { GraphQLContext } from "../context";
import { listClients } from "@/app/lib/api-helpers";

export const clientsQuery = async (
  _: unknown,
  {
    page = 1,
    size = 10,
    sortField = 'id',
    sortDir = 'asc',
    search = [],
    filters = [],
  }: ListVariables,
  context: GraphQLContext,
) => {
  const resp = await listClients(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
  return resp;
}