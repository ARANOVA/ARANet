'use client'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { amountMeta110, amountMeta130, checkCenterMeta60, textLeftMetaMax340 } from '../consts.utils';
import { aranet_invoice_item } from '@/generated/prisma';
import { Input, Textarea } from '@aranova/aranova-react-ui';

const columnHelper = createColumnHelper<aranet_invoice_item>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

export const getInvoiceItemColumns = (
  editingRowId: number | null,
  editingRows: boolean,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): ColumnDef<any, any>[] => {
 return [
    // columnHelper.accessor("id", {
    //   header: "Id",
    //   size: 60,
    //   enableHiding: false,
    //   meta: checkCenterMeta60
    // }),
    columnHelper.accessor(
      row => {
        return row.id;
      },
      {
        id: "row_index",
        header: "#",
        enableSorting: false,
        enableResizing: false,
        cell: ({ row }) => row.index + 1, // empieza en 0 → sumamos 1
        meta: checkCenterMeta60,
      }
    ),
    columnHelper.accessor("item_description", {
      header: "Descrición",
      size: 240,
      enableHiding: false,
      meta: textLeftMetaMax340,
      enableSorting: false,
      enableResizing: false,
      cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return (editingRowId === row.original.id || editingRows === true) ? (
          <Textarea
            defaultValue={row.original.item_description || ''}
            rows={5}
            onChange={e => {
              row.original.item_description = e.target.value;
            }}
          />
        ) : (
          <div
            className='whitespace-normal break-words'
            dangerouslySetInnerHTML={{ __html: row.original.item_description || '' }}
          />
        );
      },
    }),

    columnHelper.accessor("item_quantity", {
      header: "Uds.",
      size: 60,
      enableHiding: false,
      meta: checkCenterMeta60,
      enableSorting: false,
      enableResizing: false,
      cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return (editingRowId === row.original.id || editingRows === true) ? (
          <Input
            type="number"
            defaultValue={row.original.item_quantity || 0}
            onChange={e => {
              row.original.item_quantity = parseInt(e.target.value, 10);
            }}
          />
        ) : (
          new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(row.original.item_quantity || 0)
        );
      },
    }),

    columnHelper.accessor("item_cost", {
      header: "Precio Ud.",
      size: 130,
      enableHiding: false,
      meta: amountMeta130,
      enableSorting: false,
      enableResizing: false,
      cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return (editingRowId === row.original.id || editingRows === true) ? (
          <Input
            type="number"
            step={0.01}
            defaultValue={row.original.item_cost || 0}
            onChange={e => {
              row.original.item_cost = parseFloat(e.target.value);
            }}
          />
        ) : (
          new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(row.original.item_cost || 0)
        );
      },
    }),

    columnHelper.accessor(
      row => {
        if (row.item_cost === null || row.item_quantity === null) return null;
        return row.item_cost * row.item_quantity;
      },
      {
        id: "item_subtotal",
        header: "Subotal",
        size: 130,
        meta: amountMeta130,
        enableSorting: false,
        enableResizing: false,
        footer: info => {
          const amounts = info.table.getCoreRowModel().rows.map(r => {
            if (r.original.item_cost === null || r.original.item_quantity === null) return null;
            return r.original.item_quantity * r.original.item_cost;
          }).filter(r => r !== null);
          const sum = amounts.reduce((a, b) => a + b, 0);
          return sum !== null
          ? new Intl.NumberFormat(locale, {
              minimumIntegerDigits: 1,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(sum) + '€'
          : '';
        },
        cell: info => {
          const value = info.getValue();
          return value !== null
          ? new Intl.NumberFormat(locale, {
              minimumIntegerDigits: 1,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(value) + '€'
          : '';
        }
      }
    ),

    columnHelper.accessor("item_tax_rate", {
      header: "Tax",
      size: 110,
      enableHiding: false,
      meta: amountMeta110,
      enableSorting: false,
      enableResizing: false,
      cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return (editingRowId === row.original.id || editingRows === true) ? (
          <Input
            type="number"
            step={0.1}
            defaultValue={row.original.item_tax_rate || 0}
            onChange={e => {
              row.original.item_tax_rate = parseFloat(e.target.value);
            }}
          />
        ) : (
          new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }).format(row.original.item_tax_rate || 0)
        );
      },
    }),

    columnHelper.accessor(
      row => {
        if (row.item_cost === null || row.item_tax_rate === null) return null;
        return Math.round((row.item_cost * (100 + row.item_tax_rate))) / 100;
      },
      {
        id: "item_total",
        header: "Total",
        size: 130,
        enableSorting: false,
        meta: amountMeta130,
        footer: info => {
          const amounts = info.table.getCoreRowModel().rows.map(r => {
            if (r.original.item_cost === null) return null;
            return Math.round((r.original.item_cost * (100 + (r.original.item_tax_rate || 0)))) / 100;
          }).filter(r => r !== null);
          const sum = amounts.reduce((a, b) => a + b, 0);
          return sum !== null
          ? new Intl.NumberFormat(locale, {
              minimumIntegerDigits: 1,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(sum) + '€'
          : '';
        },
        cell: info => {
          const value = info.getValue();
          return value !== null
          ? new Intl.NumberFormat(locale, {
              minimumIntegerDigits: 1,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(value) + '€'
          : '';
        }
      }
    ),
    
  ];
};
