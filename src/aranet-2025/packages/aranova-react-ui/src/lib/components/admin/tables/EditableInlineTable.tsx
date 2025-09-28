'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FilterDTO, ListResponse, SingleResponse } from '../../../interfaces';
import { SimpleTanstackTable } from './SimpleTanstackTable';
import { FormAlert } from '../../elements';

interface Props<T> {
  model: string;
  idField: string;
  sortField?: string;
  sortDir?: 'desc' | 'asc';
  columns: ColumnDef<T, any>[];
  data?: ListResponse<T>;
  children?: React.ReactNode;
  alert: React.ReactNode;
  filters?: FilterDTO[],
  deleteFn: (model: string, ids: number[]) => Promise<SingleResponse<void>>;
  exportFn?: (model: string, ids: number[], exportData?: Record<string, unknown>) => Promise<boolean>;
  modalData?: { title: string; description?: string; body?: React.ReactNode };
  ui: any;
  fetchDataFn: <T extends { id?: number }>(
    model: string,
    sortField: string,
    sortDir: 'asc' | 'desc',
    filters?: FilterDTO[],
  ) => Promise<ListResponse<T>>;
}

export const EditableInlineTable = <T extends { id?: number }>({
  idField,
  data,
  children,
  deleteFn,
  exportFn,
  modalData,
  alert,
  ui,
  ...rest
}: Props<T>) => {
  return (
    <>
      <SimpleTanstackTable<T>
        data={data}
        {...rest}
        idField={idField}
        deleteFn={deleteFn}
        ui={ui}
      />
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
