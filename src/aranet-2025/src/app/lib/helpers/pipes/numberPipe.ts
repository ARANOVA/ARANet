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
  agregateFn: 'sum' | 'avg' | '' = '',
): ColumnDef<T, number | null | undefined> {
  const columnHelper = createColumnHelper<T>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const footer = agregateFn ? {footer: (info: any) => {
    const amounts = info.table.getCoreRowModel().rows.map(r => r.original[accessor]);
    let value: number | null = null;
    switch (agregateFn) {
      case 'sum':
        value = amounts.reduce((a: number, b: number) => a + b, 0);
        break;
      case 'avg':
        value = amounts.reduce((a, b) => a + b, 0) / amounts.length;
        break;
    }
    return value !== null
    ? new Intl.NumberFormat(locale, {
        minimumIntegerDigits: minIntegerDigits,
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
      }).format(value) + suffix
    : '';
  }} : {};
  return columnHelper.accessor(accessor, {
    id: String(accessor),
    header,
    ...extra,
    ...footer,
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

export function numberEditableColumn<T extends { id: number }>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessor: keyof T | any,
  editingRowId: number | null,
  editComponent: React.ReactNode,
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
  agregateFn: 'sum' | 'avg' | '' = '',
): ColumnDef<T, number | null | undefined> {
  const columnHelper = createColumnHelper<T>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const footer = agregateFn ? {footer: (info: any) => {
    const amounts = info.table.getCoreRowModel().rows.map(r => r.original[accessor]);
    let value: number | null = null;
    switch (agregateFn) {
      case 'sum':
        value = amounts.reduce((a: number, b: number) => a + b, 0);
        break;
      case 'avg':
        value = amounts.reduce((a, b) => a + b, 0) / amounts.length;
        break;
    }
    return value !== null
    ? new Intl.NumberFormat(locale, {
        minimumIntegerDigits: minIntegerDigits,
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
      }).format(value) + suffix
    : '';
  }} : {};
  return columnHelper.accessor(accessor, {
    id: String(accessor),
    header,
    ...extra,
    ...footer,
    cell: ({ getValue, row }) => {
      const value = getValue();
      if (editingRowId === row.original.id) {
        return {editComponent};
      }
      if (value == null || isNaN(value) || (zeroIsValue && value === 0)) return '';
      return new Intl.NumberFormat(locale, {
        minimumIntegerDigits: minIntegerDigits,
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
      }).format(value) + suffix;
    },
  });
}


/*
return (editingRowId === row.original.id) ? (
        <Input
          type="number"
          defaultValue={row.original.item_quantity || 0}
          onChange={e => {
            row.original.item_quantity = parseInt(e.target.value, 10);
          }}
        />
      ) : (
        (value == null || isNaN(value) || (zeroIsValue && value === 0)) ? '' : (
new Intl.NumberFormat(locale, {
        minimumIntegerDigits: minIntegerDigits,
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
      }).format(value) + suffix;
        )
      )
        */