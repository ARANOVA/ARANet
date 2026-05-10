import { CheckIcon, PencilIcon } from "@heroicons/react/16/solid";

interface Props<T> {
  data: T;
  id: number;
  currentEditingRowId: number | null;
  editFn: (data: T, id: number) => void;
  saveFn: (data: T) => Promise<boolean> | null
};

export const EditActionsCell = <T,>({
  data,
  id,
  currentEditingRowId,
  editFn,
  saveFn
}: Props<T>) => {

  return (
    <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
      {currentEditingRowId !== id ? (
        <PencilIcon
          title="Editar línea"
          className="w-[25px] h-[25px]"
          onClick={() => {
            editFn(data, id);
          }}
        />
      ) : (
        <CheckIcon
          title="Guardar línea"
          className="w-[25px] h-[25px]"
          onClick={() => {saveFn ? saveFn(data) : null}}
        />
      )}
    </span>
  )
  
}