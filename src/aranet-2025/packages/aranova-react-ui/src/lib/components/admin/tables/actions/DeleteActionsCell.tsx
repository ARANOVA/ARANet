import { TrashIcon } from "@heroicons/react/16/solid";

interface Props<T> {
  data: T;
  openAlert: (data: T) => void;
};

export const DeleteActionsCell = <T,>({ data, openAlert }: Props<T>) => {

  return (
    <span className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer">
    <TrashIcon
        title="Eliminar línea"
        className="w-[25px] h-[25px]"
        onClick={() => openAlert(data)}
    />
    </span>
  );
};
