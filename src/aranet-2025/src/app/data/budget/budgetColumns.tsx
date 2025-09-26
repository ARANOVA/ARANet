'use client'

import { dateColumn, numberColumn } from '@/app/lib/helpers';
import { aranet_budget_join_client_status_and_category, User } from '@/interfaces';
import { joinWithSeparators } from '@/utils';
import { GlobeAltIcon } from '@heroicons/react/16/solid';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from "next/link";
import { amountMeta130, checkCenterMeta60, dateCenterMeta130, tableLinkClassname, textLeftMeta130, textLeftMeta170, textLeftMeta240 } from '../consts.utils';

const columnHelper = createColumnHelper<aranet_budget_join_client_status_and_category>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const budgetColumns: ColumnDef<any, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "Id",
  //   size: 60,
  //   enableHiding: false,
  //   meta: mix(metaLeft, maxWidth60),
  // }),
  columnHelper.accessor(
    row => joinWithSeparators([row.budget_prefix, row.budget_number, row.budget_revision.toFixed(0)], ['', '-R']),
    {
      id: "budget_number",
      header: "Nº",
      size: 130,
      meta: textLeftMeta130,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <Link
            title={value}
            className={tableLinkClassname}
            href={`/budget/show/${row.id}`}
          >
            { value }
          </Link>
        );
      }
    }
  ),
  columnHelper.accessor("budget_title", {
    header: "Título",
    size: 240,
    enableHiding: false,
    meta: textLeftMeta240
  }),
  columnHelper.accessor(
    row => `${row.client?.client_unique_name}`,
    {
      id: "budget_client",
      header: "Cliente",
      size: 170,
      meta: textLeftMeta170,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <div className="flex gap-x-2">
            {row.client?.client_website && (
              <Link
                title="Ir a la web"
                className={tableLinkClassname}
                href={row.client?.client_website}
              >
                <GlobeAltIcon width={25} height={25} />
              </Link>
            )}
            <Link
              title={value}
              className={tableLinkClassname}
              href={`/client/show/${row.budget_client_id}`}
            >
              { value }
            </Link>
          </div>
        );
      }
    }
  ),

  dateColumn<User>('budget_date', 'Fecha', locale, {
    size: 130,
    meta: dateCenterMeta130,
  }),

  columnHelper.accessor("budget_status_id", {
    header: "Estado",
    size: 60,
    enableHiding: false,
    meta: checkCenterMeta60,
  }),

  numberColumn('budget_total_cost', 'Coste', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '€', {
    size: 130,
    meta: amountMeta130,
  }, true, 'sum'),

  numberColumn('budget_total_amount', 'Venta', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '€', {
    size: 130,
    meta: amountMeta130,
  }, true, 'sum'),

  columnHelper.accessor(
    row => {
      if (row.budget_total_amount === null || row.budget_total_cost === null) return null;
      return Math.round(((row.budget_total_amount - row.budget_total_cost) / row.budget_total_amount) * 100);
    },
    {
      id: "budget_margin",
      header: "Margen",
      size: 130,
      meta: amountMeta130,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return value !== null && row.budget_total_cost !== null && row.budget_total_cost > 0
        ? new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value) + '%'
        : '';
      },
      footer: info => {
        const margins = info.table.getCoreRowModel().rows.map(r => {
          if (r.original.budget_total_amount === null || r.original.budget_total_cost === null) return null;
          return Math.round(((r.original.budget_total_amount - r.original.budget_total_cost) / r.original.budget_total_amount) * 100)
        }).filter(r => r !== null);
        const avg = margins.reduce((a, b) => a + b, 0) / margins.length;
        return avg !== null
        ? new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(avg) + '%'
        : '';
      },
    }
  ),
  
];
