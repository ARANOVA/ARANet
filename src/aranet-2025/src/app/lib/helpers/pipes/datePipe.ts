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
      const date = raw ? new Date(raw) : null;
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
