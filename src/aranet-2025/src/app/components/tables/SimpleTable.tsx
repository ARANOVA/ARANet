'use client';

import {
  EditableInlineTable,
  FilterDTO,
  ListResponse,
  SingleResponse,
} from '@aranova/aranova-react-ui';
import { ColumnDef } from '@tanstack/react-table';
import { useFormUiStore } from '@/store';
import {
  deleteDataByModelGraphql,
  getListDataByModelGraphql,
} from '@/app/lib/api-wrappers/client';
import { ToastStoreAlert } from '@/app/components';


interface Props<T> {
  model: string;
  idField: string;
  columns: ColumnDef<T, unknown>[];
  data?: ListResponse<T>;
  filters?: FilterDTO[],
  children?: React.ReactNode;
  setEditingRowId: any;
}

export const SimpleTable = <T extends { id?: number }>({
  model,
  setEditingRowId,
  ...props
}: Props<T>) => {
  const formUi = useFormUiStore();
  // // Modal (delete row)
  const handleDelete = (
    model: string,
    ids: number[]
  ): Promise<SingleResponse<void>> => {
    formUi.closeAlert();
    return deleteDataByModelGraphql(model, ids);
  };

  const wrapGetListDataByModelGraphql = async <T extends { id?: number }>(
    model: string,
    sortField: string,
    sortDir: 'asc' | 'desc',
    filters?: FilterDTO[],
  ): Promise<ListResponse<T>> => {
    return getListDataByModelGraphql<T>(model, '', '', 1, -1, sortField, sortDir, undefined, filters);
  }

  return (
    <>
      <EditableInlineTable<T>
        ui={formUi}
        model={model}
        alert={<ToastStoreAlert />}
        fetchDataFn={wrapGetListDataByModelGraphql}
        {...props}
        setEditingRowId={setEditingRowId}
        deleteFn={handleDelete}
      />
    </>
  );
};
