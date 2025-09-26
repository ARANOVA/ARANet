'use client'

import { dateColumn } from '@/app/lib/helpers';
import { aranet_vendor_join_contacts, User } from '@/interfaces';
import { joinWithSeparators } from '@/utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from "next/link";
import { dateCenterMeta130, tableLinkClassname, textLeftMeta170 } from '../consts.utils';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const columnHelper = createColumnHelper<aranet_vendor_join_contacts>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const vendorColumns: ColumnDef<any, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "Id",
  //   size: 60,
  //   enableHiding: false,
  //   meta: mix(metaLeft, maxWidth60),
  // }),
  columnHelper.accessor(
    row => `${row.vendor_company_name}`, // accessor function
    {
      id: "vendor_company_name",
      header: "Empresa",
      size: 170,
      meta: textLeftMeta170,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <div className="flex gap-x-2">
            {row.vendor_website && (
              <Link
                title="Ir a la web"
                className={tableLinkClassname}
                href={row.vendor_website}
              >
                <GlobeAltIcon width={25} height={25} />
              </Link>
            )}
            <Link
              title={row.vendor_company_name}
              className={tableLinkClassname}
              href={`/vendor/show/${row.id}`}
            >
              { value }
            </Link>
          </div>
        );
      }
    }
  ),
  columnHelper.accessor(
    row => {
      if (!row.objectcontacts) {
        return '';
      }
      const main_contact = row.objectcontacts.find(contact => contact.objectcontact_is_default);
      if (!main_contact) {
        return '';
      }
      const fullname = joinWithSeparators([main_contact.aranet_contact.contact_first_name, main_contact.aranet_contact.contact_last_name], [' ']);
      return (
        <div className="flex gap-x-2">
          <Link
            title={fullname}
            className={tableLinkClassname}
            href={`/contact/show/${main_contact.objectcontact_contact_id}`}
          >
            { fullname }
          </Link>
          {main_contact.aranet_contact.contact_email && (
            <span className='flex gap-x-0.5'>
            {'['}
            <Link
              title={main_contact.aranet_contact.contact_email}
              className={tableLinkClassname}
              href={`mailto:${main_contact.aranet_contact.contact_email}`}
            >
            email
          </Link>
          {']'}
          </span>
          )}
        </div>
      );
    },
    {
      id: "main_contact",
      header: "Contacto principal",
      size: 170,
      meta: textLeftMeta170,
      cell: ({ getValue }) => getValue(),
    }
  ),

  // numberColumn<aranet_vendor_join_contacts>('aranet_projects_total', 'Proyectos', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '', {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),

  // numberColumn<aranet_vendor_join_contacts>('aranet_incomes_total', 'Ingresos', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '€', {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),
  
  dateColumn<User>('created_at', 'Fecha creación', locale, {
    size: 130,
    meta: dateCenterMeta130
  }),
  dateColumn<User>('updated_at', 'Actualizado el', locale, {
    size: 130,
    meta: dateCenterMeta130
  }),

  
];
