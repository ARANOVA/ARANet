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
  alert: React.ReactNode;
  filters?: FilterDTO[],
  deleteFn: (model: string, ids: number[]) => Promise<SingleResponse<void>>;
  ui: any;
  fetchDataFn: <T extends { id: number }>(
    model: string,
    sortField: string,
    sortDir: 'asc' | 'desc',
    filters?: FilterDTO[],
  ) => Promise<ListResponse<T>>;
  editingRowId: number | null;
  editingRows: boolean;
  setEditingRowId: (v: number | null) => void;
  setEditingRows: (v: boolean) => void;
  saveRowFn: (model: string, data: unknown) => Promise<SingleResponse<unknown>>;
  title: string;
}

export const EditableInlineTable = <T extends { id: number }>( props: Props<T>) => {
  return (
    <>
      <SimpleTanstackTable<T>
        {...props}
      />
      {/* {alert} */}
      <FormAlert
        title={`¿Estas seguro que quieres eliminar el registro?`}
        deleteFn={props.deleteFn}
        model={props.model}
        idField={props.idField}
        ui={props.ui}
      />
    </>
  );
};
