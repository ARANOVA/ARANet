'use client'

import { dateColumn } from '@/app/lib/helpers';
import { aranet_project_join_client_status_and_category, User } from '@/interfaces';
import { joinWithSeparators } from '@/utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from "next/link";
import { dateCenterMeta130, tableLinkClassname, textLeftMeta170, textLeftMeta240 } from '../consts.utils';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const columnHelper = createColumnHelper<aranet_project_join_client_status_and_category>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const projectColumns: ColumnDef<any, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "Id",
  //   size: 60,
  //   enableHiding: false,
  //   meta: mix(metaLeft, maxWidth60),
  // }),
  columnHelper.accessor(
    row => joinWithSeparators([row.project_prefix, row.project_number, row.project_name], ['', ' - ']),
    {
      id: "project_fullname",
      header: "Titulo de proyecto",
      size: 240,
      meta: textLeftMeta240,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <Link
            title={value}
            className={tableLinkClassname}
            href={`/project/show/${row.id}`}
          >
            { value }
          </Link>
        );
      }
    }
  ),
  columnHelper.accessor(
    row => `${row.client?.client_unique_name}`,
    {
      id: "client_unique_name",
      header: "Cliente",
      size: 170,
      meta: textLeftMeta170,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return value ? (
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
              href={`/client/show/${row.project_client_id}`}
            >
              { value }
            </Link>
          </div>
        ) : null;
      }
    }
  ),

  // numberColumn<aranet_project_join_contacts>('aranet_projects_total', 'Proyectos', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '', {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),

  // numberColumn<aranet_project_join_contacts>('aranet_incomes_total', 'Ingresos', { minFractionDigits: 2, maxFractionDigits: 2, locale }, '€', {
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
