'use client';

import {
  EditableInlineTable,
  WhereInput,
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
  model?: string;
  idField?: string;
  sortField?: string;
  sortDir?: 'desc' | 'asc';
  columns: ColumnDef<T, unknown>[];
  data?: ListResponse<T>;
  filters?: WhereInput,
  children?: React.ReactNode;
  saveRowFn?: (model: string, data: unknown, filters: WhereInput | null) => Promise<SingleResponse<unknown>>;
  editingRowId?: number | null;
  setEditingRowId?: (v: number | null) => void;
  editingRows?: boolean;
  setEditingRows?: (v: boolean) => void;
  title?: string;
  editMode: boolean;
  includeAddRow?: boolean;
}

export const SimpleTable = <T extends { id: number }>({
  model,
  data,
  setEditingRowId,
  saveRowFn,
  setEditingRows,
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

  const wrapGetListDataByModelGraphql = async <T,>(
    model: string,
    sortField: string,
    sortDir: 'asc' | 'desc',
    filters?: WhereInput | null,
  ): Promise<ListResponse<T>> => {
    if (!model && data) return data as any;
    return getListDataByModelGraphql<T>(model, '', '', 1, -1, sortField, sortDir, undefined, filters || null);
  }

  return (
    <>
      <EditableInlineTable<T>
        ui={formUi}
        model={model}
        alert={<ToastStoreAlert />}
        fetchDataFn={wrapGetListDataByModelGraphql}
        data={data}
        {...props}
        setEditingRowId={setEditingRowId}
        deleteFn={handleDelete}
        saveRowFn={saveRowFn}
      />
    </>
  );
};
