'use client'

import { dateColumn, numberColumn } from '@/app/lib/helpers';
import { aranet_income_item_join_vendor_project_and_category } from '@/interfaces';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from "next/link";
import { amountMeta130, amountMeta60, dateCenterMeta130, textLeftMeta170, tableLinkClassname } from '../consts.utils';

const columnHelper = createColumnHelper<aranet_income_item_join_vendor_project_and_category>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const incomeColumns: ColumnDef<any, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "Id",
  //   size: 60,
  //   enableHiding: false,
  //   meta: mix(metaLeft, maxWidth60),
  // }),
  columnHelper.accessor(
    row => `${row.category?.category_title}`,
    {
      id: "income_category_name",
      header: "Nombre",
      size: 170,
      enableSorting: false,
      meta: textLeftMeta170,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <div className="flex flex-col">
            <span>{value}</span>
            <Link
              title={value}
              className={tableLinkClassname}
              href={`/income/show/${row.id}`}
            >
              <span className="text-xs">{row.income_item_name}</span>
            </Link>
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
            className={tableLinkClassname}
            href={`/vendor/show/${row.income_item_vendor_id}`}
          >
            { value }
          </Link>
        ) : null;
      }
    }
  ),
  dateColumn('income_date', 'Fecha', locale, {
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
    'income_item_base',
    'Base',
    { minFractionDigits: 2, maxFractionDigits: 2, locale },
    '€',
    {
      size: 130,
      meta: amountMeta130,
    },
    true,
    'sum',
  ),

  numberColumn('expense_item_irpf', 'IRPF', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '€', {
    size: 130,
    meta: amountMeta60,
    enableSorting: false,
  }),

  numberColumn('income_item_tax_rate', 'Tax', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '%', {
    size: 60,
    meta: amountMeta60,
    enableSorting: false,
  }, true),

  columnHelper.accessor(
    row => {
      if (row.income_item_amount === null || row.income_item_tax_rate === null) return null;
      return Math.round((row.income_item_amount * (100 + (row.income_item_tax_rate || 0)))) / 100 - (row.income_item_irpf || 0);
    },
    {
      id: "income_item_total",
      header: "Total",
      footer: info => {
        const amounts = info.table.getCoreRowModel().rows.map(r => Math.round((r.original.income_item_amount * (100 + (r.original.income_item_tax_rate || 0)))) / 100 - (r.original.income_item_irpf || 0));
        const sum = amounts.reduce((a, b) => a + b, 0);
        return sum !== null
        ? new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 1,
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
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value) + '€'
        : '';
      }
    }
  ),
  
];
