'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FilterDTO, FormUi, ListResponse, SearchDTO, SingleResponse } from '../../../interfaces';
import { TanstackTable } from './TanstackTable';
import { FilterDrawer, FormAlert, FormDrawer } from '../../elements';

interface Props<T> {
  page?: number;
  pageDataSelection?: React.ReactNode;
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
  columns: ColumnDef<T, any>[];
  data?: ListResponse<T>;
  children: React.ReactNode;
  alert: React.ReactNode;
  formFilters?: React.ReactNode;
  deleteFn: (model: string, ids: number[]) => Promise<SingleResponse<void>>;
  exportFn?: (model: string, ids: number[], exportData?: Record<string, unknown>) => Promise<boolean>;
  modalData?: { title: string; description?: string; body?: React.ReactNode };
  ui: FormUi;
  fetchDataFn: <T>(
    model: string,
    taxonomy: string,
    status: string,
    page: number,
    limit: number,
    sortField: string,
    sortDir: 'asc' | 'desc',
    searches: SearchDTO[],
    FilterField: FilterDTO[],
  ) => Promise<ListResponse<T>>;
}

export const EditableTable = <T extends { id?: number }>({
  pageDataSelection,
  editTitle,
  newTitle,
  viewTitle,
  subtitle,
  idField,
  data,
  children,
  formFilters,
  deleteFn,
  exportFn,
  modalData,
  alert,
  ui,
  ...rest
}: Props<T>) => {
  return (
    <>
      <TanstackTable<T>
        data={data}
        {...rest}
        idField={idField}
        deleteFn={deleteFn}
        exportFn={exportFn}
        modalData={modalData}
        ui={ui}
      />
      <FormDrawer
        title={editTitle}
        pageDataSelection={pageDataSelection}
        newTitle={newTitle}
        subtitle={subtitle}
        idField={idField}
        viewTitle={viewTitle}
        ui={ui}
      >
        {children}
      </FormDrawer>
      <FilterDrawer
        title={'Filtros'}
        subtitle={'Filtra los resultados'}
        ui={ui}
      >
        {formFilters}
      </FilterDrawer>
      {/* {alert} */}
      <FormAlert
        title={`¿Estas seguro que quieres eliminar el registro?`}
        deleteFn={deleteFn}
        model={rest.model}
        idField={idField}
        ui={ui}
      />
    </>
  );
};
