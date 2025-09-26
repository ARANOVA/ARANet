'use client'

import { dateColumn, numberColumn } from '@/app/lib/helpers';
import { aranet_invoice_join_client, Invoice } from '@/interfaces';
import { ColumnDef, ColumnMeta, createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from "next/link";

const columnHelper = createColumnHelper<aranet_invoice_join_client>()

interface AranovaColumnMeta {
  className?: string;
}

const metaCenter: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "text-center !pr-0 !pl-0 !px-0",
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
export const invoiceColumns: ColumnDef<any, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "Id",
  //   size: 60,
  //   enableHiding: false,
  //   meta: mix(metaLeft, maxWidth60),
  // }),
  columnHelper.accessor(
    row => `${row.invoice_prefix}${row.invoice_number}`, // accessor function
    {
      id: "invoice_full_number",
      header: "Nº",
      size: 130,
      meta: mix(metaLeft, maxWidth130),
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <Link
            title={`${row.invoice_prefix}${row.invoice_number}`}
            className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
            href={`/invoice/show/${row.id}`}
          >
            { value }
          </Link>
        );
      }
    }
  ),
  columnHelper.accessor("invoice_title", {
    header: "Título",
    size: 170,
    enableHiding: false,
    meta: mix(metaLeft, maxWidth170),
  }),
  columnHelper.accessor(
    row => `${row.client?.client_unique_name}`,
    {
      id: "client_company_name",
      header: "Cliente",
      size: 170,
      enableSorting: false,
      meta: mix(metaLeft, maxWidth170),
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return value ? (
          <Link
            title={row.client?.client_unique_name}
            className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
            href={`/client/show/${row.invoice_client_id}`}
          >
            { value }
          </Link>
        ) : null;
      }
    }
  ),
  dateColumn('invoice_date', 'Fecha', locale, {
    size: 130,
    meta: mix(metaCenter, maxWidth130),
  }),

  columnHelper.accessor("invoice_payment_status_id", {
    header: "Estado",
    size: 60,
    enableHiding: false,
    enableSorting: false,
    meta: mix(metaCenter, maxWidth60),
  }),

  columnHelper.accessor(
    row => {
      if (row.invoice_periodic === null || row.invoice_periodic_current === null) return null;
      return `${row.invoice_periodic_current}/${row.invoice_periodic}`;
    },
    {
      id: "invoice_periodic",
      header: "Periodicidad",
      size: 130,
      enableSorting: false,
      meta: mix(metaRight, maxWidth130),
      cell: info => info.getValue(),
    }
  ),

  numberColumn('invoice_total_amount', 'Base', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '€', {
    size: 130,
    meta: mix(metaRight, maxWidth130),
  }),

  numberColumn('invoice_tax_rate', 'Tax', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '%', {
    size: 60,
    meta: mix(metaRight, maxWidth60),
    enableSorting: false,
  }, false),

  columnHelper.accessor(
    row => {
      if (row.invoice_total_amount === null || row.invoice_tax_rate === null) return null;
      return Math.round((row.invoice_total_amount * (100 + row.invoice_tax_rate))) / 100;
    },
    {
      id: "invoice_total",
      header: "Total",
      size: 130,
      enableSorting: false,
      meta: mix(metaRight, maxWidth130),
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
