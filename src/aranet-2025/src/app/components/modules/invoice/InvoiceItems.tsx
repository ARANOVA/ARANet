'use client';

import { SimpleTable } from "@/app/components";
import { getInvoiceItemColumns } from "@/app/data/invoice_item/invoiceItemColumns";
import { createSingleDataByModel, updateSingleDataByModel } from "@/app/lib/api-wrappers/server";
import { aranet_invoice_item } from "@/generated/prisma";
import { aranet_invoice_join_all, IntFilter } from "@/interfaces";
import { deepClone, getModelState } from "@/utils";
import { FilterDTO, SingleResponse, WhereInput } from "@aranova/aranova-react-ui";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  invoice: aranet_invoice_join_all;
  className?: string;
}

export const InvoiceItems = ({ invoice, className }: Props) => {
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editingRows, setEditingRows] = useState<boolean>(false);

  const filters: WhereInput = {
    item_invoice_id: {
      equals: invoice.id,
    },
  }

  const handleSave = async (
    model: string,
    data: unknown,
    filters
    : WhereInput | null = null,
  ): Promise<SingleResponse<unknown>> => {
    const aux = deepClone(data) as Partial<aranet_invoice_item>;
    const id = aux.id;
    delete aux.id;
    // TODO: filters
    console.log({filters})
    if (!id) {
      // Create
      return createSingleDataByModel<aranet_invoice_item>(model, aux) as Promise<SingleResponse<unknown>>;
    } else {
      // Update
      return updateSingleDataByModel<aranet_invoice_item>(model, id, aux) as Promise<SingleResponse<unknown>>;
    }
  }

  const state = getModelState(invoice);

  return (
    <div className={clsx(className, 'relative h-full w-full rounded-xl bg-zinc-50 shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-800 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.20),0px_1px_0px_0px_rgba(255,255,255,0.06)_inset] forced-colors:outline')}>
      <div className="flex flex-col justify-between gap-4 w-full overflow-hidden p-3 py-4 sm:p-4 lg:p-6">
        <SimpleTable
          model="invoice_item"
          idField="id"
          filters={filters}
          editMode={!!(state?.value && ['sent', 'deleted'].indexOf(state?.value) === -1)}
          editingRows={editingRows}
          title="Items de la factura"
          setEditingRows={setEditingRows}
          columns={getInvoiceItemColumns(editingRowId, editingRows)}
          saveRowFn={handleSave}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
        >
        </SimpleTable>
      </div>
    </div>
  );
}