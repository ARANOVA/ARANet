import { ListVariables } from "@aranova/aranova-react-ui";
import { GraphQLContext } from "../context";
import { listInvoices } from "@/app/lib/api-helpers";

export const invoicesQuery = async (
  _: unknown,
  {
    page = 1,
    size = 10,
    sortField = 'invoice_date',
    sortDir = 'asc',
    search = [],
    filters = [],
  }: ListVariables,
  context: GraphQLContext,
) => {
  const resp = await listInvoices(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
  return resp;
}