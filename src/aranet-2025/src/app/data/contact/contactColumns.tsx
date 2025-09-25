'use client'

import { dateColumn } from '@/app/lib/helpers';
import { aranet_contact } from '@/generated/prisma';
import { User } from '@/interfaces';
import { ColumnDef, ColumnMeta, createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from "next/link";

const columnHelper = createColumnHelper<aranet_contact>()

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
export const contactColumns: ColumnDef<any, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "Id",
  //   size: 60,
  //   enableHiding: false,
  //   meta: mix(metaLeft, maxWidth60),
  // }),
  columnHelper.accessor(
    row => `${row.contact_first_name} ${row.contact_last_name}`, // accessor function
    {
      id: "contact_first_name",
      header: "Contacto",
      size: 170,
      meta: mix(metaLeft, maxWidth170),
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <Link
            title={value}
            className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
            href={`/admin/contact/show/${row.id}`}
          >
            { value }
          </Link>
        );
      }
    }
  ),
  columnHelper.accessor('contact_email',
    {
      id: "contact_email",
      header: "Email",
      size: 170,
      meta: mix(metaLeft, maxWidth170),
      cell: info => {
        const value = info.getValue();
        if (!value) return;
        return (
          <Link
            title={value}
            className="flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
            href={`mailto:${value}`}
          >
          {value}
        </Link>
      )
    }
  }),
  columnHelper.accessor(
    row => `${row.contact_phone} / ${row.contact_mobile}`,
    {
      id: "contact_phone",
      header: "Tel./Fax/Móv.",
      size: 170,
      meta: mix(metaLeft, maxWidth170),
      cell: info => {
        const row = info.row.original;
        let value = row.contact_phone ? `Teléfono: ${row.contact_phone}\n` : '';
        value = row.contact_fax ? `Fax: ${row.contact_fax}\n` : '';
        value = row.contact_mobile ? `Móvil: ${row.contact_mobile}\n` : '';
        return value;
      }
    }
  ),

  // numberColumn<aranet_contact_join_contacts>('aranet_projects_total', 'Proyectos', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '', {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),

  // numberColumn<aranet_contact_join_contacts>('aranet_incomes_total', 'Ingresos', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '€', {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),
  
  dateColumn<User>('created_at', 'Fecha creación', locale, {
    size: 130,
    meta: mix(metaCenter, maxWidth130),
  }),
  dateColumn<User>('updated_at', 'Actualizado el', locale, {
    size: 130,
    meta: mix(metaCenter, maxWidth130),
  }),

  
];
