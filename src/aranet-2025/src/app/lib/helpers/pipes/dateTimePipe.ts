import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export function dateTimeColumn<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessor: keyof T | any,
  header: string,
  locale: string = navigator?.language || 'es-ES',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra: Record<string, any> = {},
): ColumnDef<T, Date | string | null> {
  const columnHelper = createColumnHelper<T>();

  return columnHelper.accessor(accessor, {
    id: String(accessor),
    header,
    ...extra,
    cell: ({ getValue }) => {
      const raw = getValue();
      let date: Date | null = null;

      if (raw == null) return '';

      if (typeof raw === 'string' && /^\d+$/.test(raw)) {
        // Timestamp en string
        date = new Date(parseInt(raw, 10));
      } else if (typeof raw === 'string') {
        // ISO u otro formato string
        date = new Date(raw);
      } else if (raw instanceof Date) {
        date = raw;
      }

      if (!date || isNaN(date.getTime())) return '';

      return date.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    },
  });
}
