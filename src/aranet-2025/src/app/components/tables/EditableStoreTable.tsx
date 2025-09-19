'use client';

import { useState } from 'react';
import {
  EditableTable,
  ListResponse,
  SingleResponse,
} from '@aranova/aranova-react-ui';
import { ColumnDef } from '@tanstack/react-table';
import { useFormUiStore, useItemsStore, useFiltersStore } from '@/store';
import {
  deleteDataByModel,
  exportDataByModel,
  getListDataByModel,
  getListDataByModelGraphql,
} from '@/app/lib/api-wrappers/server';
import { ExportData, Filters } from '@/interfaces';
import { ListFiltersForm, ToastStoreAlert, DownloadFile } from '@/app/components';


interface Props<T> {
  page?: number;
  limit?: number;
  editTitle: string;
  newTitle: string;
  viewTitle: string;
  subtitle?: string;
  model: string;
  idField: string;
  sortField?: string;
  sortDir?: 'desc' | 'asc';
  editModel?: 'modal' | 'page';
  showModel?: 'modal' | 'page';
  columns: ColumnDef<T, unknown>[];
  filters: Filters[];
  data?: ListResponse<T>;
  children: React.ReactNode;
  pageDataSelection: React.ReactNode;
  exportForm?: React.ReactNode;
}

export const EditableStoreTable = <T extends { id?: number }>({
  model,
  filters: listFilters,
  idField,
  exportForm,
  ...props
}: Props<T>) => {
  const formUi = useFormUiStore();
  // Store selected items
  const {
    items,
    setItems,
    resetItems,
    getItems,
    getSelectedAll,
    setSelectedAll,
  } = useItemsStore();
  const { filters, setFilters, getFiltersByModel } = useFiltersStore();
  const [responseExport, setResponseExport] = useState<ExportData>({
    file: '',
    filename: '',
  });

  // // Modal (delete row)
  const handleDelete = (
    model: string,
    ids: number[]
  ): Promise<SingleResponse<void>> => {
    formUi.closeAlert();
    return deleteDataByModel(model, ids);
  };

  // // Modal (export)
  const handleExport = async (
    model: string,
    ids: number[],
    exportData?: Record<string, unknown>
  ): Promise<boolean> => {
    // TODO: Cerrar el formulario
    const data = await exportDataByModel(model, ids, exportData);
    if (!data.error && data.statusCode >= 200 && !!data.data) {
      // OK
      setResponseExport(data.data);
    }
    return !data.error && data.statusCode >= 200 && !!data.data;
  };

  const modalData = {
    title: 'Opciones de exportación',
    description: 'Selecciona los parámetros de exportación',
    body: exportForm,
  };

  return (
    <>
      <DownloadFile {...responseExport} />
      <EditableTable<T>
        model={model}
        alert={<ToastStoreAlert />}
        fetchDataFn={getListDataByModelGraphql}
        ui={{
          ...formUi,
          items,
          getItems,
          setItems,
          resetItems,
          filters,
          setFilters,
          getFiltersByModel,
          getSelectedAll,
          setSelectedAll,
        }}
        idField={idField}
        {...props}
        formFilters={<ListFiltersForm model={model} filters={listFilters} />}
        deleteFn={handleDelete}
        exportFn={handleExport}
        modalData={exportForm ? modalData : undefined}
      />
    </>
  );
};
