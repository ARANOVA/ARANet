'use client'

import { dateColumn, numberColumn } from '@/app/lib/helpers';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { amountMeta130, dateCenterMeta130, textLeftMeta170, textLeftMeta240 } from '../consts.utils';
import { aranet_cash_item } from '@/generated/prisma';

const columnHelper = createColumnHelper<aranet_cash_item>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cashColumns: ColumnDef<any, any>[] = [
  columnHelper.accessor("cash_item_name", {
    header: "Nombre",
    size: 170,
    enableHiding: false,
    meta: textLeftMeta170,
  }),

  columnHelper.accessor("cash_item_comments", {
    header: "Comentarios",
    size: 240,
    enableHiding: false,
    meta: textLeftMeta240,
  }),

  dateColumn('cash_date', 'Fecha', locale, {
    size: 130,
    meta: dateCenterMeta130,
  }),

  numberColumn(
    'cash_item_amount',
    'Cantidad',
    { minFractionDigits: 2, maxFractionDigits: 2, locale },
    '€',
    {
      size: 130,
      meta: amountMeta130,
    },
    true,
    'sum',
  ),
  
];
