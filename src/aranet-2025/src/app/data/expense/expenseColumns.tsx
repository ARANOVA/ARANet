'use client'

import { dateColumn, numberColumn } from '@/app/lib/helpers';
import { aranet_expense_item_join_vendor_and_category } from '@/interfaces';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from "next/link";
import { amountMeta130, amountMeta60, amountMeta110, dateCenterMeta130, textLeftMeta170 } from '../consts.utils';

const columnHelper = createColumnHelper<aranet_expense_item_join_vendor_and_category>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const expenseColumns: ColumnDef<any, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "Id",
  //   size: 60,
  //   enableHiding: false,
  //   meta: mix(metaLeft, maxWidth60),
  // }),
  columnHelper.accessor(
    row => `${row.category?.category_title}`,
    {
      id: "expense_category_title",
      header: "Referencia",
      size: 170,
      enableSorting: false,
      meta: textLeftMeta170,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <div className="flex flex-col">
            <span>{value}</span>
            <span className="text-xs dark:text-zinc-400 text-zinc-800">{row.expense_item_name}</span>
          </div>
        );
      }
    }
  ),
  
  columnHelper.accessor(
    row => `${row.vendor?.vendor_unique_name}`,
    {
      id: "vendor_company_name",
      header: "Proveedor",
      size: 170,
      enableSorting: false,
      meta: textLeftMeta170,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return value ? (
          <Link
            title={value}
            className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
            href={`/vendor/show/${row.expense_item_vendor_id}`}
          >
            { value }
          </Link>
        ) : null;
      }
    }
  ),
  dateColumn('expense_purchase_date', 'Fecha', locale, {
    size: 130,
    meta: dateCenterMeta130,
  }),

  // columnHelper.accessor("invoice_payment_status_id", {
  //   header: "Estado",
  //   size: 60,
  //   enableHiding: false,
  //   enableSorting: false,
  //   meta: mix(metaCenter, maxWidth60),
  // }),


  numberColumn(
    'expense_item_amount',
    'Base',
    { minFractionDigits: 2, maxFractionDigits: 2, locale },
    '€',
    {
      size: 130,
      meta: amountMeta130,
    },
    true,
    true,
  ),

  numberColumn('expense_item_irpf', 'IRPF', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '€', {
    size: 130,
    meta: amountMeta60,
    enableSorting: false,
  }),

  numberColumn('expense_item_tax_rate', 'Tax', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '%', {
    size: 60,
    meta: amountMeta60,
    enableSorting: false,
  }, true),

  columnHelper.accessor(
    row => {
      if (row.expense_item_amount === null || row.expense_item_tax_rate === null) return null;
      return Math.round((row.expense_item_amount * (100 + (row.expense_item_tax_rate || 0)))) / 100 - (row.expense_item_irpf || 0);
    },
    {
      id: "expense_item_total",
      header: "Total",
      footer: info => {
        const amounts = info.table.getCoreRowModel().rows.map(r => Math.round((r.original.expense_item_amount * (100 + (r.original.expense_item_tax_rate || 0)))) / 100 - (r.original.expense_item_irpf || 0));
        const sum = amounts.reduce((a, b) => a + b, 0);
        return sum !== null
        ? new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(sum) + '€'
        : '';
      },
      size: 130,
      enableSorting: false,
      meta: amountMeta130,
      cell: info => {
        const value = info.getValue();
        return value !== null
        ? new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value) + '€'
        : '';
      }
    }
  ),
  
];
