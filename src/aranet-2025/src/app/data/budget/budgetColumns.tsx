'use client'

import { dateColumn, numberColumn } from '@/app/lib/helpers';
import { aranet_budget_join_client_status_and_category, User } from '@/interfaces';
import { joinWithSeparators } from '@/utils';
import { GlobeAltIcon } from '@heroicons/react/16/solid';
import { ColumnDef, ColumnMeta, createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from "next/link";

const columnHelper = createColumnHelper<aranet_budget_join_client_status_and_category>()

interface AranovaColumnMeta {
  className?: string;
}

const metaCenter: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "text-center !pr-0 !pl-0 !px-0",
};

const metaFlexCenter: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "mx-auto !pr-0 !pl-0 !px-0",
};

const metaLeft: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "text-left",
};

const metaRight: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "text-right",
};

const maxWidth60: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "min-w-[60px] max-w-[60px] w-[60px] overflow-hidden whitespace-nowrap text-ellipsis",
};

const maxWidth90: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "min-w-[90px] max-w-[90px] w-[90px] overflow-hidden whitespace-nowrap text-ellipsis",
};

const maxWidth130: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "min-w-[130px] max-w-[130px] w-[130px] overflow-hidden whitespace-nowrap text-ellipsis",
};

const maxWidth170: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "min-w-[170px] max-w-[170px] w-[170px] overflow-hidden whitespace-nowrap text-ellipsis",
};

const maxWidth240: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "min-w-[170px] max-w-[240px] w-[240px] overflow-hidden whitespace-nowrap text-ellipsis",
};

const mix = (...args: (ColumnMeta<AranovaColumnMeta, unknown> | undefined)[]): ColumnMeta<AranovaColumnMeta, unknown> | undefined => {
  // TODO: Sólo mezla el className
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    className: clsx(args.map(arg => (arg as any).className))
  };
};


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
      meta: mix(metaLeft, maxWidth130),
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <Link
            title={value}
            className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
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
    meta: mix(metaLeft, maxWidth240),
  }),
  columnHelper.accessor(
    row => `${row.client?.client_unique_name}`,
    {
      id: "budget_client",
      header: "Cliente",
      size: 170,
      meta: mix(metaLeft, maxWidth170),
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <div className="flex gap-x-2">
            {row.client?.client_website && (
              <Link
                title="Ir a la web"
                className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
                href={row.client?.client_website}
              >
                <GlobeAltIcon width={25} height={25} />
              </Link>
            )}
            <Link
              title={value}
              className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
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
    meta: mix(metaCenter, maxWidth130),
  }),

  columnHelper.accessor("budget_status_id", {
    header: "Estado",
    size: 60,
    enableHiding: false,
    meta: mix(metaCenter, maxWidth60),
  }),

  numberColumn('budget_total_cost', 'Coste', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '€', {
    size: 130,
    meta: mix(metaRight, maxWidth130),
  }, true),

  numberColumn('budget_total_amount', 'Venta', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '€', {
    size: 130,
    meta: mix(metaRight, maxWidth130),
  }),

  columnHelper.accessor(
    row => {
      if (row.budget_total_amount === null || row.budget_total_cost === null) return null;
      return Math.round(((row.budget_total_amount - row.budget_total_cost) / row.budget_total_amount) * 100);
    },
    {
      id: "budget_margin",
      header: "Margen",
      size: 130,
      meta: mix(metaRight, maxWidth130),
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return value !== null && row.budget_total_cost !== null && row.budget_total_cost > 0
        ? new Intl.NumberFormat(locale, {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value) + '%'
        : '';
      }
    }
  ),
  

  // dateColumn<User>('created_at', 'Fecha creación', locale, {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),
  // dateColumn<User>('updated_at', 'Actualizado el', locale, {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),

  
];
