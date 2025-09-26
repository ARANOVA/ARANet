'use client'

import { dateColumn } from '@/app/lib/helpers';
import { aranet_contact } from '@/generated/prisma';
import { User } from '@/interfaces';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from "next/link";
import { dateCenterMeta130, tableLinkClassname, textLeftMeta170 } from '../consts.utils';

const columnHelper = createColumnHelper<aranet_contact>()

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
      meta: textLeftMeta170,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <Link
            title={value}
            className={tableLinkClassname}
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
      meta: textLeftMeta170,
      cell: info => {
        const value = info.getValue();
        if (!value) return;
        return (
          <Link
            title={value}
            className={tableLinkClassname}
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
      meta: textLeftMeta170,
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
    meta: dateCenterMeta130,
  }),
  dateColumn<User>('updated_at', 'Actualizado el', locale, {
    size: 130,
    meta: dateCenterMeta130,
  }),
  
];
