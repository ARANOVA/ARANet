import { aranet_invoice_item } from "@/generated/prisma"
import { SimpleTable } from "@/app/components";

interface Props {
  items: aranet_invoice_item[],
}

export const InvoiceItems = ({ items }: Props) => {
  return (
    <SimpleTable
      model="aranet_invoice_item"
      idField="id"
      columns={[]}
    >
      {JSON.stringify(items)}
    </SimpleTable>
  );
}