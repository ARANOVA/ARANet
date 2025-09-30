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
import clsx from 'clsx';
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  CheckIcon,
  XMarkIcon,
  PlusCircleIcon,
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
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../tw';
import { NotificationAlert, SyncLoader } from '../../elements';
import { customFlexRender } from '../../../helpers';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface Props<T> {
  model: string;
  idField?: string;
  sortField?: string;
  sortDir?: 'desc' | 'asc';
  columns: ColumnDef<T, any>[];
  data?: ListResponse<T>;
  filters?: FilterDTO[];
  deleteFn: (model: string, ids: number[]) => Promise<SingleResponse<void>>;
  fetchDataFn: <T>(
    model: string,
    sortField: string,
    sortDir: 'asc' | 'desc',
    filters?: FilterDTO[],
  ) => Promise<ListResponse<T>>;
  ui: any;
  editMode: boolean;
  editingRowId: number | null;
  setEditingRowId: (v: number | null) => void;
  editingRows: boolean;
  setEditingRows: (v: boolean) => void;
  saveRowFn: (model: string, data: unknown) => Promise<SingleResponse<unknown>>;
  title: string;
}

export const SimpleTanstackTable = <T,>({
  model,
  idField,
  sortField,
  sortDir,
  columns,
  title,
  editMode,
  data,
  filters,
  deleteFn,
  saveRowFn,
  fetchDataFn,
  ui,
  setEditingRowId,
  editingRows,
  setEditingRows,
}: Props<T>) => {
  idField = idField || 'id';
  const [returnAlert, setReturnAlert] = useState<React.ReactNode>(null);
  const [currentEditingRowId, setCurrentEditingRowId] = useState<number | null>(null);

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
  const addEmptyRow = async () => {
    const newRow: any = {
      item_description: '',
      item_cost: 0,
      item_quantity: 0,
      item_tax_rate: 0,
    };
    await wrapperSaveFn(newRow);
  };

  const wrapperSaveFn = async (data: any): Promise<boolean> => {
    try {
      setNbsaved(1);
      await mutationSave.mutateAsync(data); // espera a que acabe
      return mutationSave.isSuccess;
    } catch (error) {
      // TODO:
      console.error("Error al guardar", error);
      return false;
    }
  };

  const wrapperSaveAllFn = async (): Promise<boolean> => {
    const rows = table.getCoreRowModel().rows;
    setNbsaved(rows.length);
    try {
      for (const r of rows) {
        await wrapperSaveFn(r.original); 
      }
      return true;
    } catch (error) {
      // TODO
      console.error("Error al guardar todas", error);
      return false;
    }
  };

  const handleEdit = (data: any, id: number) => {
    setEditingRowId(id);
    setCurrentEditingRowId(id || null);
    // TODO
    ui.setModeForm('edit');
    ui.openDrawer(data);
    ui.setSelectedItem(data);
  };

  const wrapperDeleteFn = (
    ids: number[] | number
  ): boolean => {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    setNbdeleted(ui.items.length);
    mutation.mutate(ids);
    return mutation.isSuccess;
  };

  const className = "text-right overflow-hidden whitespace-nowrap text-ellipsis min-w-[90px] max-w-[90px] w-[90px]";
  const actionsColumn: ColumnDef<T> = {
    id: 'actions',
    meta: {
      cellClass: className,
      headerClass: className,
      footerClass: className,
    },
    header: () => 'Acciones',
    footer: () => {
      return (
        <div className="inline-flex items-center justify-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
            <PlusCircleIcon
              title="Añadir línea"
              className="w-[25px] h-[25px]"
              onClick={() => {
                console.log("ADD Line");
                addEmptyRow();
              }}
            />
          </span>
        </div>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="inline-flex items-center justify-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
            {currentEditingRowId !== row.original[idField as keyof typeof row.original] ? (
              <PencilIcon
                title="Editar línea"
                className="w-[25px] h-[25px]"
                onClick={() => {
                  handleEdit(data, row.original[idField as keyof typeof row.original] as number);
                }}
              />
            ) : (
              <CheckIcon
                title="Guardar línea"
                className="w-[25px] h-[25px]"
                onClick={() => {
                  !mutationSave.isPending ? wrapperSaveFn(data) : null;
                }}
              />
            )}
          </span>
          <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
            <TrashIcon
              title="Eliminar línea"
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

  // Save/Batch
  const [nbsaved, setNbsaved] = useState<number>(0);

  const queryClient = useQueryClient();

  const mutationSave = useMutation<SingleResponse<unknown>, Error, unknown>({
     mutationFn: data => {
      filters?.forEach(f => {
        // TODO: Mejorar
        (data as any)[f.field] = f.field.endsWith('_id') ? Number(f.value) : f.value;
      });
      return saveRowFn(model as any, data);
     },
     onSuccess: data => {
      if (data.statusCode < 300) {
        queryClient.invalidateQueries({ queryKey: [model] });
        setEditingRowId(null);
        setCurrentEditingRowId(null);
        ui.setToastProps({
          type: 'success',
          title: '¡Conseguido!',
          subtitle: nbsaved === 1 ? 'Registro guardado' : `${nbsaved} Registros guardados`,
        });
      } else {
        ui.setToastProps({
          type: 'error',
          title: 'Algo fué mal!',
          subtitle: nbsaved === 1 ? `No se pudo guardar el registro` : `No se pudieron guardar todos los registros`,
        });
      }
      ui.showToast(3000);
    },
    onError: error => {
      ui.setToastProps({
        type: 'warning',
        title: 'Algo fué mal!',
        subtitle: nbsaved === 1 ? `No se pudo guardar el registro` : `No se pudieron guardar ${nbsaved} registros`,
      });
      ui.showToast(3000);
    },
  });

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
        subtitle: nbdeleted === 1 ? `No se pudo eliminar el registro` : `No se pudieron eliminar ${nbdeleted} registros`,
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

  const tableCols = [...columns];
  if (editMode) {
    tableCols.push(actionsColumn);
  }

  const table = useReactTable<any>({
    data: dataQuery.data?.data?.items || [],
    columns: tableCols,
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
    <div className="mt-4 sm:mx-0 table-none md:table-auto w-full">

        <div className="max-sm:w-full sm:flex-1 flex flex-wrap items-center gap-2 mb-4">

          <div className="flex-grow">
            <div className="flex items-center flex-1 gap-4 print:gap-0">
              <h3 className="text-lg/7 font-semibold tracking-[-0.015em] text-zinc-950 sm:text-base/7 dark:text-white">
                {title}
              </h3>
            </div>
          </div>
          {editMode && (
            <div className="flex justify-end grow sm:flex-none">
              <div className="flex gap-4">
                {/* Edit/Save button */}
                {!editingRows ? (
                  <Button
                    title="Editar items"
                    className="cursor-pointer"
                    color="dark/zinc"
                    onClick={() => setEditingRows(true)}
                  >
                    <PencilSquareIcon className="w-6 h-6" />
                    Editar
                  </Button>
                ) : (
                  <Button
                    title="Guardar items"
                    className="cursor-pointer"
                    color="dark/white"
                    onClick={() => wrapperSaveAllFn()}
                  >
                    <CheckIcon className="w-6 h-6" />
                    Guardar
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

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
