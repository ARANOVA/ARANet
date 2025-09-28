'use client';

import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  FilterDTO,
  ListResponse,
  SingleResponse,
} from '../../../interfaces';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../tw';
import { NotificationAlert, SyncLoader } from '../../elements';
import { customFlexRender } from '../../../helpers';

interface Props<T> {
  model: string;
  idField?: string;
  sortField?: string;
  sortDir?: 'desc' | 'asc';
  columns: ColumnDef<T, any>[];
  data?: ListResponse<T>;
  filters?: FilterDTO[];
  deleteFn: (model: string, ids: number[]) => Promise<SingleResponse<void>>;
  fetchDataFn: <T extends { id?: number }>(
    model: string,
    sortField: string,
    sortDir: 'asc' | 'desc',
    filters?: FilterDTO[],
  ) => Promise<ListResponse<T>>;
  ui: any;
}

export const SimpleTanstackTable = <T extends { id?: number }>({
  model,
  idField,
  sortField,
  sortDir,
  columns,
  data,
  filters,
  deleteFn,
  fetchDataFn,
  ui,
}: Props<T>) => {
  idField = idField || 'id';
  const [returnAlert, setReturnAlert] = useState<React.ReactNode>(null);
  const router = useRouter();

  // Column order
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  // Sorting
  const defaultSort = [];
  if (sortField) {
    defaultSort.push({
      id: sortField,
      desc: sortDir === 'desc',
    });
  }
  const [sorting] = useState<SortingState>(defaultSort);

  // Actions
  const pathname = usePathname();
  const handleEdit = (data: any) => {
    // TODO
    ui.setModeForm('edit');
    ui.openDrawer(data);
    ui.setSelectedItem(data);
  };

  const className = "text-right !pl-0 !pr-0 !mr-0 !ml-0 overflow-hidden whitespace-nowrap text-ellipsis min-w-[90px] max-w-[90px] w-[90px]";
  const actionsColumn: ColumnDef<T> = {
    id: 'actions',
    meta: {
      cellClass: className,
      headerClass: className,
      footerClass: className,
    },
    header: () => 'Acciones',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="inline-flex items-center justify-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
            <PencilIcon
              className="w-[25px] h-[25px]"
              onClick={() => {
                handleEdit(data);
              }}
            />
          </span>
          <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
            <TrashIcon
              className="w-[25px] h-[25px]"
              onClick={() => {
                ui.openAlert(data);
              }}
            />
          </span>
        </div>
      );
    },
  };

  // Delete/Batch
  const [nbdeleted, setNbdeleted] = useState<number>(0);

  const queryClient = useQueryClient();

  const mutation = useMutation<SingleResponse<void>, Error, number[]>({
    mutationFn: ids => {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      return deleteFn(model as any, ids);
    },
    onSuccess: data => {
      if (data.statusCode < 300) {
        queryClient.invalidateQueries({ queryKey: [model] });
        ui.setToastProps({
          type: 'success',
          title: '¡Conseguido!',
          subtitle: nbdeleted === 1 ? 'Registro eliminado' : `${nbdeleted} Registros eliminados`,
        });
      } else {
        ui.setToastProps({
          type: 'error',
          title: 'Algo fué mal!',
          subtitle: nbdeleted === 1 ? `No se pudo eliminar el registro` : `No se pudieron eliminar todos los registros`,
        });
      }
      ui.showToast(3000);
    },
    onError: error => {
      ui.setToastProps({
        type: 'warning',
        title: 'Algo fué mal!',
        subtitle: nbdeleted === 1 ? `No se pudo eliminar el registro` : `No se pudieron eliminar ${nbdeleted} registro(s)`,
      });
      ui.showToast(3000);
    },
  });

  // Data
  const dataQuery = useQuery<ListResponse<T>>({
    queryKey: [
      model,
      { sorting },
    ],
    queryFn: () => {
      return fetchDataFn(
        model,
        sorting?.[0]?.id,
        sorting?.[0]?.desc ? 'desc' : 'asc',
        filters,
      );
    },
    initialData: data,
    placeholderData: keepPreviousData,
  });

  const updateAlert = () => {
    if (dataQuery.isLoading) {
      setReturnAlert(
        <div className="flex items-center justify-center min-h-30">
          <SyncLoader color="#999" />
        </div>
      );
    } else if (dataQuery.error || dataQuery.data?.error) {
      setReturnAlert(
        <div className="my-8 w-full">
          <NotificationAlert
            type="warning"
            title="No pudieron cargarse los datos"
            text="Por favor, recarga la página y si el error persiste en unos minutos notifícalo"
          />
        </div>
      );
    } else if (dataQuery.data?.data?.metadata?.total === 0) {
      setReturnAlert(
        <div className="mt-8 w-full">
          <NotificationAlert
            type="warning"
            title="No hay datos"
            text="No hay registros que coincidan con la búsqueda"
          />
        </div>
      );
    } else {
      setReturnAlert(null);
    }
  }

  useEffect(() => {
    // setIsMounted(true);
    updateAlert();
  }, [dataQuery.isFetched, dataQuery.isLoading, dataQuery.error, dataQuery.data?.error, dataQuery.data?.data]);

  const searchParams = useSearchParams();

  const table = useReactTable<any>({
    data: dataQuery.data?.data?.items || [],
    columns: [...columns, actionsColumn],
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row, index) => {
      return String(row[idField as keyof typeof row] ?? index);
    },
    debugTable: false,
    state: {
      columnOrder,
      sorting,
    },
    onColumnOrderChange: setColumnOrder,
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
    rowCount: dataQuery.data?.data?.metadata?.total,
    manualPagination: false,
    enableRowSelection: false,
  });

  return (
    <div className="mt-4 sm:mx-0 table-none md:table-auto">
      {returnAlert ? (
        returnAlert
      ) : (
        <>
          <Table
            striped
            bleed
          >
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <TableHeader
                      key={header.id}
                      className={clsx(
                        header.column.columnDef.meta?.headerClass || header.column.columnDef.meta?.className || '',
                        'py-3 pl-4 sm:pl-0 pr-3 text-xs font-medium uppercase tracking-wide dark:text-zinc-400 text-zinc-800 !text-center'
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none group inline-flex items-center'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === 'asc'
                                ? 'Ordenar ascendentemente'
                                : header.column.getNextSortingOrder() === 'desc'
                                ? 'Ordenar descendentemente'
                                : 'Borrar ordenación'
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span
                              className={clsx(
                                'group-hover:visible group-focus:visible ml-2 flex-none rounded-sm bg-zinc-700 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800',
                                { invisible: !header.column.getIsSorted() }
                              )}
                            >
                              {
                                {
                                  asc: (
                                    <ChevronUpIcon
                                      aria-hidden="true"
                                      className="size-5"
                                    />
                                  ),
                                  desc: (
                                    <ChevronDownIcon
                                      aria-hidden="true"
                                      className="size-5"
                                    />
                                  ),
                                }[
                                  (header.column.getIsSorted() as string) ||
                                    'desc'
                                ]
                              }
                            </span>
                          )}
                        </div>
                      )}
                    </TableHeader>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell
                      key={cell.id}
                      className={clsx(
                        cell.column.columnDef.meta?.cellClass || cell.column.columnDef.meta?.className || 'pl-4 sm:pl-0 pr-3',
                      )}
                    >
                      {cell.getContext().row.original[cell.column.id] ===
                      true ? (
                        <div className="flex justify-center items-center">
                          <CheckIcon width={25} />
                        </div>
                      ) : cell.getContext().row.original[cell.column.id] ===
                      false ? (
                        <div className="flex justify-center items-center">
                          <XMarkIcon width={25} />
                        </div>
                      ) : (
                        customFlexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>

            {/* Footer */}
            <TableHead>
              {table.getFooterGroups().map(footerGroup => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header: any) => (
                    <TableHeader
                      key={header.id}
                      // colSpan={table.getFooterGroups()[0].headers.length}
                      className={clsx(
                        header.column.columnDef.meta?.footerClass || header.column.columnDef.meta?.className,
                        'py-3 pl-4 sm:pl-0 pr-3 !font-extrabold dark:text-zinc-300 text-zinc-900',
                        'bg-zinc-950/2.5 dark:bg-white/2.5 border-t-4 border-t-zinc-950/10 dark:border-t-white/10')}
                    >
                      {flexRender(header.column.columnDef.footer, header.getContext())}
                    </TableHeader>
                  ))}
                </TableRow>
              ))}
            </TableHead>
          </Table>

        </>
      )}
    </div>
  );
};
