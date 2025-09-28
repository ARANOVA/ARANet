'use client';

import { SimpleTable } from "@/app/components";
import { getInvoiceItemColumns } from "@/app/data/invoice_item/invoiceItemColumns";
import { Button, FilterDTO } from "@aranova/aranova-react-ui";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface Props {
  invoice_id: number;
}

export const InvoiceItems = ({ invoice_id }: Props) => {
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const filter: FilterDTO = {
    field: "item_invoice_id",
    value: invoice_id.toString(),
  }

  return (
    <div className="relative h-full w-full rounded-xl bg-zinc-50 shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-800 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.20),0px_1px_0px_0px_rgba(255,255,255,0.06)_inset] forced-colors:outline">
      <div className="flex flex-col justify-between gap-4 w-full overflow-hidden p-3 py-4 sm:p-4 lg:p-6">
        <div className="max-sm:w-full sm:flex-1 flex flex-wrap items-center gap-2">

          <div className="flex-grow">
            <div className="flex items-center flex-1 gap-4 print:gap-0">
              <h3 className="text-lg/7 font-semibold tracking-[-0.015em] text-zinc-950 sm:text-base/7 dark:text-white">
                Items de la factura
              </h3>
            </div>
          </div>
          <div className="flex justify-end grow sm:flex-none">
            <div className="flex gap-4">
              <Button
                title="Editar items"
                className="cursor-pointer"
                color="dark/zinc"
                onClick={() => console.log("EDIT")}
              >
                <PencilSquareIcon className="w-6 h-6" />
                Editar
              </Button>
            </div>
          </div>
        </div>
        <SimpleTable
          model="invoice_item"
          idField="id"
          filters={[filter]}
          columns={getInvoiceItemColumns(editingRowId, setEditingRowId)}
          setEditingRowId={setEditingRowId}
        >
        </SimpleTable>
      </div>
    </div>
  );
}