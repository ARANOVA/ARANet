'use client';

import { SimpleTable } from "@/app/components";
import { getInvoiceItemColumns } from "@/app/data/invoice_item/invoiceItemColumns";
import { createSingleDataByModel, updateSingleDataByModel } from "@/app/lib/api-wrappers/server";
import { aranet_invoice_item } from "@/generated/prisma";
import { aranet_invoice_join_all } from "@/interfaces";
import { useFormUiStore } from "@/store";
import { deepClone, getModelState } from "@/utils";
import { SingleResponse, WhereInput } from "@aranova/aranova-react-ui";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  invoice: aranet_invoice_join_all;
  className?: string;
}

export const InvoiceItems = ({ invoice, className }: Props) => {
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editingRows, setEditingRows] = useState<boolean>(false);
  const { openAlert, setToastProps, showToast, setModeForm, openDrawer, setSelectedItem } = useFormUiStore();
  const model = "invoice_item";
  const nbsaved = 1;

  const filters: WhereInput = {
    item_invoice_id: {
      equals: invoice.id,
    },
  }

  const handleSave = async (
    data: unknown,
  ): Promise<SingleResponse<unknown>> => {
    const aux = deepClone(data) as Partial<aranet_invoice_item>;
    const id = aux.id;
    delete aux.id;
    aux.item_invoice_id = invoice.id;
    if (!id) {
      // Create
      return createSingleDataByModel<aranet_invoice_item>(model, aux) as Promise<SingleResponse<unknown>>;
    } else {
      // Update
      return updateSingleDataByModel<aranet_invoice_item>(model, id, aux) as Promise<SingleResponse<unknown>>;
    }
  }

  const state = getModelState(invoice);

  const queryClient = useQueryClient();

  const mutationSave = useMutation<SingleResponse<unknown>, Error, unknown>({
     mutationFn: data => handleSave(data),
     onSuccess: data => {
      if (data.statusCode < 300) {
        console.log({data})
        queryClient.invalidateQueries({ queryKey: [model] });
        setEditingRowId(null);
        setToastProps({
          type: 'success',
          title: '¡Conseguido!',
          subtitle: nbsaved === 1 ? 'Registro guardado' : `${nbsaved} Registros guardados`,
        });
      } else {
        setToastProps({
          type: 'error',
          title: '¡Algo fué mal!',
          subtitle: nbsaved === 1 ? `No se pudo guardar el registro` : `No se pudieron guardar todos los registros`,
        });
      }
      showToast(3000);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: _error => {
      setToastProps({
        type: 'warning',
        title: '¡Algo fué mal!',
        subtitle: nbsaved === 1 ? `No se pudo guardar el registro` : `No se pudieron guardar ${nbsaved} registros`,
      });
      showToast(3000);
    },
  });

  const wrapperSaveFn = (data: unknown): void => {
    mutationSave.mutate(data);
  };

  const wrapperEditFn = (data: unknown): void => {
    const id = (data as aranet_invoice_item).id;
    setEditingRowId(id);
  };

  return (
    <div className={clsx(className, 'relative h-full w-full rounded-xl bg-zinc-50 shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-800 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.20),0px_1px_0px_0px_rgba(255,255,255,0.06)_inset] forced-colors:outline')}>
      <div className="flex flex-col justify-between gap-4 w-full overflow-hidden p-3 py-4 sm:p-4 lg:p-6">
        <SimpleTable
          model={model}
          idField="id"
          filters={filters}
          editMode={(!!state?.value && ['sent', 'deleted', 'payed', 'pending-paym2ent'].indexOf(state?.value) === -1)}
          editingRows={editingRows}
          title="Items de la factura"
          setEditingRows={setEditingRows}
          columns={getInvoiceItemColumns(editingRowId, editingRows)}
          saveRowFn={handleSave}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
          actions={[
            {
              icon: [
                <PencilIcon key="1" title="Editar línea" className="w-[25px] h-[25px]" />,
                <CheckIcon key="2" title="Guardar línea" className="w-[25px] h-[25px]" />
              ],
              label: ['Editar línea', 'Guardar línea'],
              onClick: [wrapperEditFn, wrapperSaveFn],
            },
            {
              icon: [<TrashIcon key="1" title="Eliminar línea" className="w-[25px] h-[25px]" />],
              label: ['Eliminar línea'],
              onClick: [openAlert],
            },
          ]}
        >
        </SimpleTable>
      </div>
    </div>
  );
}