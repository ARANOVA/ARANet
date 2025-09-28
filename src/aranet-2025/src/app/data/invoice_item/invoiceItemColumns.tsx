'use client'

import { numberColumn } from '@/app/lib/helpers';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { amountMeta130, amountMeta60, checkCenterMeta60, textLeftMetaMax340 } from '../consts.utils';
import { aranet_invoice_item } from '@/generated/prisma';

const columnHelper = createColumnHelper<aranet_invoice_item>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invoiceItemColumns: ColumnDef<any, any>[] = [
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
    cell: ({ row }) => (
      <div
        className='whitespace-normal break-words'
        dangerouslySetInnerHTML={{ __html: row.original.item_description || '' }}
      />
    ),
  }),
  numberColumn(
    'item_quantity',
    'Uds.',
    { minFractionDigits: 0, maxFractionDigits: 0, locale },
    '',
    { size: 60, meta: checkCenterMeta60, enableSorting: false, enableResizing: false, }
  ),
  numberColumn('item_cost', 'Precio Ud.', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '€', {
    size: 130,
    meta: amountMeta130,
    enableSorting: false,
    enableResizing: false,
  }, true),

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

  numberColumn('item_tax_rate', 'Tax', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '%', {
    size: 60,
    meta: amountMeta60,
    enableSorting: false,
  }, false),

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
