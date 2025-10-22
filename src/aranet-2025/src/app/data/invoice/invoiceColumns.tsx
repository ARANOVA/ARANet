'use client'

import { dateColumn, dateTimeColumn, numberColumn } from '@/app/lib/helpers';
import { aranet_invoice_join_client } from '@/interfaces';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from "next/link";
import { amountMeta110, amountMeta130, amountMeta60, checkCenterMeta60, dateCenterMeta130, tableLinkClassname, textLeftMeta130, textLeftMeta170 } from '../consts.utils';
import { getErrorMessage } from '@/utils/client/verifactu';

const columnHelper = createColumnHelper<aranet_invoice_join_client>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

const full_number = columnHelper.accessor(
  row => `${row.invoice_prefix}${row.invoice_number}`, // accessor function
  {
    id: "invoice_full_number",
    header: "Nº",
    size: 130,
    meta: textLeftMeta130,
    cell: info => {
      const value = info.getValue();
      const row = info.row.original;
      return (
        <Link
          title={`${row.invoice_prefix}${row.invoice_number}`}
          className={tableLinkClassname}
          href={`/invoice/show/${row.id}`}
        >
          { value }
        </Link>
      );
    }
  }
);

const invoice_title = columnHelper.accessor(
  row => `${row.invoice_title}`,
  {
    id: "invoice_title",
    header: "Título",
    size: 170,
    enableSorting: false,
    meta: textLeftMeta170,
    cell: info => {
      const value = info.getValue();
      return value ? <span title={value}>{value}</span> : null;
    }
  }
);

const client = columnHelper.accessor(
  row => `${row.client?.client_unique_name}`,
  {
    id: "client_company_name",
    header: "Cliente",
    size: 170,
    enableSorting: false,
    meta: textLeftMeta170,
    cell: info => {
      const value = info.getValue();
      const row = info.row.original;
      return value && row.invoice_client_id ? (
        <Link
          title={row.client?.client_unique_name}
          className={tableLinkClassname}
          href={`/client/show/${row.invoice_client_id}`}
        >
          { value }
        </Link>
      ) : value ? <span title={value}>{value}</span> : null;
    }
  }
);

const date = dateColumn('invoice_date', 'Fecha', locale, {
  size: 130,
  meta: dateCenterMeta130
});

const created_at = dateTimeColumn('created_at', 'Creada', locale, {
  size: 130,
  meta: dateCenterMeta130
});

const base = numberColumn('invoice_total_amount', 'Base', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '€', {
  size: 130,
  meta: amountMeta130
}, true, 'sum');

const rate = numberColumn('invoice_tax_rate', 'Tax', { minFractionDigits: 0, maxFractionDigits: 0, locale }, '%', {
  size: 60,
  meta: amountMeta60,
  enableSorting: false,
}, false);

const total = columnHelper.accessor(
  row => {
    if (row.invoice_total_amount === null || row.invoice_tax_rate === null) return null;
    return Math.round((row.invoice_total_amount * (100 + row.invoice_tax_rate))) / 100;
  },
  {
    id: "invoice_total",
    header: "Total",
    size: 130,
    enableSorting: false,
    meta: amountMeta130,
    footer: info => {
      const amounts = info.table.getCoreRowModel().rows.map(r => {
        if (r.original.invoice_total_amount === null) return null;
        return Math.round((r.original.invoice_total_amount * (100 + (r.original.invoice_tax_rate || 0)))) / 100;
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
);

const verifactu_error = columnHelper.accessor(
  row => `${row.sent_response_code}`,
  {
    id: "sent_response_code",
    header: "Estado",
    size: 130,
    enableSorting: false,
    meta: dateCenterMeta130,
    cell: info => {
      const value = info.getValue();
      return value ? <span title={getErrorMessage(value)}>{value}</span> : null;
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invoiceColumns: ColumnDef<any, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "Id",
  //   size: 60,
  //   enableHiding: false,
  //   meta: mix(metaLeft, maxWidth60),
  // }),
  full_number,
  invoice_title,
  client,
  date,

  columnHelper.accessor("invoice_payment_status_id", {
    header: "Estado",
    size: 60,
    enableHiding: false,
    enableSorting: false,
    meta: checkCenterMeta60,
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
      meta: amountMeta110,
      cell: info => info.getValue(),
    }
  ),

  base,
  rate,
  total,  
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invoiceVerifactuColumns: ColumnDef<any, any>[] = [
  full_number,
  invoice_title,
  client,
  date,
  created_at,
  verifactu_error,
  base,
  rate,
  total,
];
