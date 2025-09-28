import { SimpleTable } from "@/app/components";
import { invoiceItemColumns } from "@/app/data/invoice_item/invoiceItemColumns";
import { FilterDTO } from "@aranova/aranova-react-ui";

interface Props {
  invoice_id: number;
}

export const InvoiceItems = ({ invoice_id }: Props) => {
  const filter: FilterDTO = {
    field: "item_invoice_id",
    value: invoice_id.toString(),
  }

  return (
    <SimpleTable
      model="invoice_item"
      idField="id"
      filters={[filter]}
      columns={invoiceItemColumns}
    >
    </SimpleTable>
  );
}