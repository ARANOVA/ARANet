'use client'

import { dateColumn } from '@/app/lib/helpers';
import { sf_guard_user_join_profile, User } from '@/interfaces';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from "next/link";
import { checkCenterMeta60, dateCenterMeta130, tableLinkClassname, textLeftMeta130, textLeftMeta170 } from '../consts.utils';

const columnHelper = createColumnHelper<sf_guard_user_join_profile>()

// TODO
const locale = 'es-ES'; //navigator?.language ?? 'es-ES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userColumns: ColumnDef<any, any>[] = [
  columnHelper.accessor(
    row => `${row.username}`, // accessor function
    {
      id: "username",
      header: "Usuario",
      size: 130,
      meta: textLeftMeta130,
      cell: info => {
        const value = info.getValue();
        const row = info.row.original;
        return (
          <Link
            title={row.username}
            className={tableLinkClassname}
            href={`/admin/user/show/${row.id}`}
          >
            { value }
          </Link>
        );
      }
    }
  ),
  columnHelper.accessor(
    row => {
      if (!row.profile) {
        return '';
      }
      let fullname = row.profile.first_name;
      if (row.profile.last_name) {
        fullname += ' ' + row.profile.last_name;
      }
      return fullname;
    },
    {
      id: "user_fullname",
      header: "Nombre",
      size: 170,
      meta: textLeftMeta170,
      cell: ({ getValue }) => getValue(),
    }
  ),

  dateColumn<User>('created_at', 'Fecha creación', locale, {
    size: 130,
    meta: dateCenterMeta130,
  }),
  dateColumn<User>('last_login', 'Último login', locale, {
    size: 130,
    meta: dateCenterMeta130,
  }),
  columnHelper.accessor("is_active", {
    header: "¿Activo?",
    size: 60,
    enableHiding: false,
    meta: checkCenterMeta60,
  }),

  columnHelper.accessor("is_super_admin", {
    header: "¿Super-admin?",
    size: 60,
    enableHiding: false,
    meta: checkCenterMeta60,
  }),
  
];
