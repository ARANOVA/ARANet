import { ListVariables } from "@aranova/aranova-react-ui";
import { GraphQLContext } from "../context";
import { listVendors } from "@/app/lib/api-helpers";

export const vendorsQuery = async (
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
  const resp = await listVendors(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
  return resp;
}