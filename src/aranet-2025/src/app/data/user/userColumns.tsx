'use client'

import { dateColumn } from '@/app/lib/helpers';
import { sf_guard_user } from '@/generated/prisma';
import { User } from '@/interfaces';
import { ColumnDef, ColumnMeta, createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from "next/link";

const columnHelper = createColumnHelper<sf_guard_user>()

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
export const userColumns: ColumnDef<any, any>[] = [
  columnHelper.accessor("id", {
    header: "Id",
    size: 60,
    enableHiding: false,
    meta: mix(metaLeft, maxWidth60),
  }),
  columnHelper.accessor(
    row => `${row.username}`, // accessor function
    {
      id: "username",
      header: "Usuario",
      size: 130,
      meta: mix(metaLeft, maxWidth130),
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <Link
            title={row.username}
            className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
            href={`/admin/user/show/${row.id}`}
          >
            { value }
          </Link>
        );
      }
    }
  ),

  dateColumn<User>('created_at', 'Fecha creación', locale, {
    size: 130,
    meta: mix(metaCenter, maxWidth130),
  }),
  dateColumn<User>('last_login', 'Último login', locale, {
    size: 130,
    meta: mix(metaCenter, maxWidth130),
  }),
  columnHelper.accessor("is_active", {
    header: "¿Activo?",
    size: 60,
    enableHiding: false,
    meta: mix(metaFlexCenter, maxWidth60),
  }),

  columnHelper.accessor("is_super_admin", {
    header: "¿Super-admin?",
    size: 60,
    enableHiding: false,
    meta: mix(metaFlexCenter, maxWidth60),
  }),
  
];
