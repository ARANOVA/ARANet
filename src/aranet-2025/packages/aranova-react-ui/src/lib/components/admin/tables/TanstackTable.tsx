'use client';

import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  EyeIcon,
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
  FormUi,
  ItemDTO,
  ListResponse,
  SearchDTO,
  SingleResponse,
} from '../../../interfaces';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../tw';
import { NotificationAlert, PillToolbar, SyncLoader } from '../../elements';
import { ButtonHeaderTable } from '..';
import { customFlexRender } from '../../../helpers';
import { ClientPagination } from '../pagination';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';

interface Props<T> {
  model: string;
  editModel?: 'modal' | 'page';
  showModel?: 'modal' | 'page';
  page?: number;
  limit?: number;
  idField?: string;
  sortField?: string;
  sortDir?: 'desc' | 'asc';
  columns: ColumnDef<T, any>[];
  data?: ListResponse<T>;
  deleteFn: (model: string, ids: number[]) => Promise<SingleResponse<void>>;
  fetchDataFn: <T>(
    model: string,
    taxonomy: string,
    status: string,
    page: number,
    limit: number,
    sortField: string,
    sortDir: 'asc' | 'desc',
    searches: SearchDTO[],
    FilterField: FilterDTO[]
  ) => Promise<ListResponse<T>>;
  exportFn?: (
    model: string,
    ids: number[],
    exportData?: Record<string, unknown>
  ) => Promise<boolean>;
  modalData?: { title: string; description?: string; body?: React.ReactNode };
  ui: FormUi;
}

export const TanstackTable = <T extends { id?: number }>({
  model,
  limit,
  editModel = "modal",
  showModel = "modal",
  page,
  idField,
  sortField,
  sortDir,
  columns,
  data,
  deleteFn,
  fetchDataFn,
  exportFn,
  modalData,
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
  const [sorting, setSorting] = useState<SortingState>(defaultSort);

  // Pagination
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page || 0,
    pageSize: limit || 10,
  });

  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [selectedRowsData, setSelectedRowsData] = useState<any[]>([]);

  // Checkbox column
  const checkboxColumn: ColumnDef<T> = {
    id: 'select',
    meta: {
      className: 'text-center w-3',
    },
    header: ({ table }) => (
      <Checkbox
        className="mt-1 mx-6 col-start-1 row-start-1 rounded-md border bg-white border-zinc-300"
        checked={
          table.getIsAllPageRowsSelected() || table.getIsSomeRowsSelected()
        }
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={checked => table.toggleAllPageRowsSelected(checked)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mt-1 mx-6 col-start-1 row-start-1 rounded-md border bg-white border-zinc-300"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  };

  // Actions
  const pathname = usePathname();
  const handleEdit = (data: any) => {
    if (editModel === 'modal') {
      ui.setModeForm('edit');
      ui.openDrawer(data);
      ui.setSelectedItem(data);
    } else {
      if (idField) {
        ui.setSelectedItem(data);
        router.push(`${pathname.replace('/list', '/edit')}/${data[idField]}`);
      }
    }
  };

  const handleShow = (data: any) => {
    if (showModel === 'modal') {
      ui.setModeForm('show');
      ui.openDrawer(data);
    } else {
      if (idField) {
        ui.setSelectedItem(data);
        router.push(`${pathname.replace('/list', '/show')}/${data[idField]}`);
      }
    }
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
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="inline-flex items-center justify-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
            <EyeIcon
              title="Ver detalles"
              className="w-[25px] h-[25px]"
              onClick={() => {
                handleShow(data);
              }}
            />
          </span>
          <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
            <PencilIcon
              title="Editar registro"
              className="w-[25px] h-[25px]"
              onClick={() => {
                handleEdit(data);
              }}
            />
          </span>
          <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
            <TrashIcon
              title="Eliminar registro"
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

  // Export/Batch
  const [nbexported, setNbexported] = useState<number>(0);

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
        ui.setItems([]);
        ui.resetItems(model, []);
        setRowSelection({});
        queryClient.invalidateQueries({ queryKey: [model] });
        ui.setToastProps({
          type: 'success',
          title: '¡Conseguido!',
          subtitle: nbdeleted === 1 ? 'Registro eliminado' : `${nbdeleted} Registros eliminados`,
        });
      } else {
        ui.setToastProps({
          type: 'error',
          title: '¡Algo fué mal!',
          subtitle: nbdeleted === 1 ? `No se pudo eliminar el registro` : `No se pudieron eliminar todos los registros`,
        });
      }
      ui.showToast(3000);
    },
    onError: error => {
      ui.setToastProps({
        type: 'warning',
        title: '¡Algo fué mal!',
        subtitle: nbdeleted === 1 ? `No se pudo eliminar el registro` : `No se pudieron eliminar ${nbdeleted} registro(s)`,
      });
      ui.showToast(3000);
    },
  });

  const wrapperDeleteFn = (
    ids: number[] | number
  ): Promise<boolean> | boolean => {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    setNbdeleted(ui.items.length);
    mutation.mutate(ids);
    return mutation.isSuccess;
  };

  const wrapperEditFn = () => {
    ui.openDrawer(selectedRowsData);
  };

  const wrapperExportFn = async (ids: number[] | number): Promise<void> => {
    if (!exportFn) return;
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    let nbRegs = ui.items.length;
    if (ui.getSelectedAll(model)) {
      nbRegs = dataQuery.data?.data?.metadata?.total || 0;
    }
    setNbexported(nbRegs);
    const res = await exportFn(model, ids, ui.exportData || {});
    if (res) {
      ui.setToastProps({
        type: 'success',
        title: '¡Conseguido!',
        subtitle: nbRegs === 1 ? 'Registro exportado' : `${nbRegs} Registros exportados`,
      });
    } else {
      ui.setToastProps({
        type: 'warning',
        title: '¡Algo fué mal!',
        subtitle: nbRegs === 1 ? `No se pudo exportar el registro` : `No se pudieron exportar todos los registros`,
      });
    }
    ui.showToast(3000);
  };

  // Data
  const latestSearchTerm = useRef<string>(ui.searchTerm);
  const dataQuery = useQuery<ListResponse<T>>({
    queryKey: [
      model,
      { pagination, sorting, searchTerm: ui.searchTerm, filters: ui.filters },
    ],
    queryFn: () => {
      latestSearchTerm.current = ui.searchTerm;
      return fetchDataFn(
        model,
        '',
        '',
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting?.[0]?.id,
        sorting?.[0]?.desc ? 'desc' : 'asc',
        ui.getSearchesForType(model) || [],
        ui.filters || []
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
    columns: [checkboxColumn, ...columns, actionsColumn],
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row, index) => {
      return String(row[idField as keyof typeof row] ?? index);
    },
    debugTable: false,
    state: {
      columnOrder,
      sorting,
      pagination,
      rowSelection,
    },
    onColumnOrderChange: setColumnOrder,
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    onSortingChange: updater => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(updater);
      const params = new URLSearchParams(searchParams.toString());
      params.set('sortField', String(newSorting[0]?.id || ''));
      params.set('sortDir', String(newSorting[0]?.desc ? 'desc' : 'asc'));
      router.replace(`?${params.toString()}`);
    },

    rowCount: dataQuery.data?.data?.metadata?.total,
    manualPagination: true,
    onPaginationChange: updater => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater;
      setPagination(newPagination);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(newPagination.pageIndex + 1));
      params.set('limit', String(newPagination.pageSize));
      router.replace(`?${params.toString()}`);
    },

    enableRowSelection: true,
    onRowSelectionChange: updater => {
      const newRowSelection =
        typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newRowSelection);
      const selectedIds = Object.keys(newRowSelection).filter(
        id => newRowSelection[id]
      );
      const rowsData = table
        .getRowModel()
        .rows.filter(row => selectedIds.includes(row.id))
        .map(row => row.original);

      setSelectedRowsData(rowsData);

      const storageItems = selectedIds.map(id => ({
        type: model,
        id: isNaN(Number(id)) ? id : Number(id),
      }));

      //mantener items de otro type pero eliminar los del model actual al cambiar de pagina
      const otherModels = ui.items.filter(item => item.type !== model);

      ui.setItems([...otherModels, ...storageItems]);
    },
  });
  useEffect(() => {
    const initialSelection: { [key: string]: boolean } = {};
    const rowsData: any[] = [];

    table.getRowModel().rows.forEach(row => {
      const rowId = String(row.original[idField as keyof typeof row.original]);

      const exists = ui.items.some(
        (item: ItemDTO) =>
          item.type === model &&
          (item.id === rowId || item.id === Number(rowId))
      );

      if (exists || ui.getSelectedAll(model)) {
        initialSelection[rowId] = true;
        rowsData.push(row.original)
      }
    });

    setSelectedRowsData(rowsData)
    setRowSelection(initialSelection);
  }, [dataQuery.data?.data?.items, ui.items, idField, model]);

  const [pills, setPills] = useState<{ title: string; context: any }[]>([]);

  useEffect(() => {
    setPills(
      ui.getFiltersByModel(model).map((filter: any) => ({
        title: `${filter.value_title}: ${filter.title}`,
        context: filter,
      }))
    );
  }, [model, ui]);

  const setActivePills = (pills: { title: string; context: any }[]) => {
    ui.setFilters(pills.map(pill => pill.context));
  };

  const selectAll = (value: boolean): void => {
    ui.setSelectedAll(value, model);
    if (value === false) {
      const modfilter = ui.items.filter(mod => mod.type !== model);
      ui.setItems(modfilter);
    }
  };

  return (
    <div className="mt-4 sm:mx-0 table-none md:table-auto">
      <div className="max-sm:w-full sm:flex-1 flex flex-row items-start gap-3">
        <ButtonHeaderTable
          selectedItems={ui.getItems(model)}
          selectedAll={ui.getSelectedAll(model)}
          deleteFn={wrapperDeleteFn}
          editFn={wrapperEditFn}
          exportFn={exportFn ? wrapperExportFn : undefined}
          modalData={modalData}
        />

        <Button
          color="dark/white"
          onClick={() => {
            ui.openLeftDrawer();
          }}
          className="cursor-pointer"
        >
          <AdjustmentsHorizontalIcon />
          <span className="hidden sm:block">Filtros</span>
        </Button>

        <PillToolbar
          pills={pills}
          setActivePills={setActivePills}
        />
      </div>

      {returnAlert ? (
        returnAlert
      ) : (
        <>
          <Table
            striped
            bleed
            className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
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
              {Object.keys(table.getState().rowSelection).length ===
                pagination.pageSize && (
                <TableRow>
                  <TableHeader
                    colSpan={table.getHeaderGroups()[0].headers.length}
                    className="py-3 pl-4 sm:pl-0 pr-3 text-sm font-medium dark:text-zinc-400 text-zinc-800"
                  >
                    {ui.getSelectedAll(model) ? (
                      <p>
                        Se han seleccionado los{' '}
                        {dataQuery.data?.data?.metadata?.total || 0}{' '}
                        registros.&nbsp;
                        <a
                          onClick={() => selectAll(false)}
                          className="cursor-pointer underline text-black dark:text-zinc-400"
                        >
                          Anular la selección
                        </a>
                      </p>
                    ) : (
                      <p>
                        Se han seleccionado los {pagination.pageSize} registros
                        de esta página.&nbsp;
                        <a
                          onClick={() => selectAll(true)}
                          className="cursor-pointer underline text-black dark:text-zinc-400"
                        >
                          Seleccionar los{' '}
                          {dataQuery.data?.data?.metadata?.total || 0} registros
                        </a>
                      </p>
                    )}
                  </TableHeader>
                </TableRow>
              )}
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

          <ClientPagination
            totalPages={dataQuery.data?.data?.metadata?.last || 1}
            totalItems={dataQuery.data?.data?.metadata?.total || 0}
            table={table}
          />
        </>
      )}
    </div>
  );
};
