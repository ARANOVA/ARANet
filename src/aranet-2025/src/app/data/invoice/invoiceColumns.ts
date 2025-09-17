'use client'

import { dateColumn, numberColumn } from '@/app/lib/helpers';
import { aranet_invoice } from '@/generated/prisma';
import { Invoice } from '@/interfaces';
import { ColumnDef, ColumnMeta, createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';

const columnHelper = createColumnHelper<aranet_invoice>()

interface AranovaColumnMeta {
  className?: string;
}

const metaCenter: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "text-center !pr-0 !pl-0 !px-0",
};

const metaLeft: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: "text-left !pr-0 !pl-0 !px-0",
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
const tipoCalendarioCellFormatter = ({ getValue }: { getValue: any }) => {
  const raw = getValue();
  switch (raw) {
    case 1:
      return 'General';
    case 2:
      return 'Equipo';
    case 3:
      return 'Personal';
    default:
      return 'Desconocido';
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tipoTemporalCellFormatter = ({ getValue }: { getValue: any }) => {
  const raw = getValue();
  switch (raw) {
    case 0:
      return 'Aprobado';
    case 1:
      return 'Temporal';
    case 2:
      return 'Solicitud';
    case 3:
      return 'Borrador';
    default:
      return 'Desconocido';
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invoiceColumns: ColumnDef<Invoice, any>[] = [
  columnHelper.accessor("id", {
    header: "Id",
    size: 60,
    enableHiding: false,
    meta: mix(metaLeft, maxWidth60),
  }),
  // columnHelper.accessor("Nombre", {
  //   header: "Nombre",
  //   size: 170,
  //   enableResizing: true,
  //   meta: maxWidth170,
  // }),
  // columnHelper.accessor("titulo", {
  //   header: "Equipo / Empleado",
  //   size: 170,
  //   enableSorting: false,
  //   meta: maxWidth170,
  //   enableResizing: true,
  // }),
  // columnHelper.accessor("TipoCalendario", {
  //   header: "Tipo Calendario",
  //   size: 170,
  //   meta: mix(metaCenter, maxWidth170),
  //   cell: tipoCalendarioCellFormatter,
  // }),
  // columnHelper.accessor("TipoTemporal", {
  //   header: "Estado",
  //   size: 90,
  //   meta: mix(metaCenter, maxWidth90),
  //   cell: tipoTemporalCellFormatter,
  // }),
  // numberColumn<CalendarioListado>('HorasTotales', 'Horas', { minFractionDigits: 0, maxFractionDigits: 2, locale }, {
  //   size: 90,
  //   meta: mix(metaRight, maxWidth90),
  // }),
  // dateColumn<CalendarioListado>('FechaSolicitud', 'Solicitud', locale, {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),
  // dateColumn<CalendarioListado>('FechaAprobacion', 'Aprobación', locale, {
  //   size: 130,
  //   meta: mix(metaCenter, maxWidth130),
  // }),
];
