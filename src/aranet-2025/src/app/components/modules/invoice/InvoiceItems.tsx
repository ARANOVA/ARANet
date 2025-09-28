import { SimpleTable } from "@/app/components";
import { invoiceItemColumns } from "@/app/data/invoice_item/invoiceItemColumns";
import { Divider, FilterDTO } from "@aranova/aranova-react-ui";

interface Props {
  invoice_id: number;
}

export const InvoiceItems = ({ invoice_id }: Props) => {
  const filter: FilterDTO = {
    field: "item_invoice_id",
    value: invoice_id.toString(),
  }

  return (
    <div className="relative h-full w-full rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.20),0px_1px_0px_0px_rgba(255,255,255,0.06)_inset] forced-colors:outline">
      <div className="grid h-full w-full overflow-hidden place-items-start justify-items-center p-3 py-4 sm:p-4 lg:p-6">
        <h3 className="text-lg/7 font-semibold tracking-[-0.015em] text-zinc-950 sm:text-base/7 dark:text-white">Items de la factura</h3>
        <SimpleTable
          model="invoice_item"
          idField="id"
          filters={[filter]}
          columns={invoiceItemColumns}
        >
        </SimpleTable>
      </div>
    </div>
  );
}