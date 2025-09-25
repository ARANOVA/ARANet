import { NumberFormatOptions } from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";


export const numberPipe = (value?: number | null, format?: NumberFormatOptions ): string => {
  if (value == null || isNaN(value)) return '';

  return new Intl.NumberFormat(format?.locale || 'es-ES', {
    minimumIntegerDigits: format?.minIntegerDigits || 1,
    minimumFractionDigits: format?.minFractionDigits || 0,
    maximumFractionDigits: format?.maxFractionDigits || 2,
  }).format(value);
}

export function numberColumn<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessor: keyof T | any,
  header: string,
  {
    locale = navigator.language,
    minIntegerDigits = 1,
    minFractionDigits = 0,
    maxFractionDigits = 3,
  }: NumberFormatOptions = {},
  suffix: string = '',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra: Record<string, any>,
  zeroIsValue = true,
): ColumnDef<T, number | null | undefined> {
  const columnHelper = createColumnHelper<T>();

  return columnHelper.accessor(accessor, {
    id: String(accessor),
    header,
    ...extra,
    cell: ({ getValue }) => {
      const value = getValue();
      if (value == null || isNaN(value) || (zeroIsValue && value === 0)) return '';

      return new Intl.NumberFormat(locale, {
        minimumIntegerDigits: minIntegerDigits,
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
      }).format(value) + suffix;
    },
  });
}
