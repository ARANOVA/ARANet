import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export function dateColumn<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessor: keyof T | any,
  header: string,
  locale: string = navigator?.language || 'es-ES',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra: Record<string, any>,
): ColumnDef<T, Date | string | null> {
  const columnHelper = createColumnHelper<T>();

  return columnHelper.accessor(accessor, {
    id: String(accessor),
    header,
    ...extra,
    cell: ({ getValue }) => {
      const raw = getValue();
      let date!: Date;
      if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
        // TS en string
        date = new Date(parseInt(raw, 10));
      } else if (typeof raw === 'string') {
        date = new Date(raw);
      } else {
        date = raw as Date;
      }
      return date
        ? date.toLocaleDateString(locale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        : '';
    },
  });
}

export const datePipe = (raw: Date | string, locale: string = navigator?.language || 'es-ES'): string => {
  let date!: Date;
  if (typeof raw === 'string' && parseInt(raw) === Number(raw)) {
    // TS en string
    date = new Date(parseInt(raw, 10));
  } else if (typeof raw === 'string') {
    // ISO en string
    date = new Date(raw);
  }
  return date
    ? date.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    : '';
}