import { RowAction } from "../../../../interfaces";

interface ActionsCellProps<T> {
  data: T;
  actions?: RowAction<T>[];
  currentEditingRowId: number | null;
  setCurrentEditingRowId: (v: number | null) => void;
  id: number;
}

export function ActionsCell<T>({ data, actions, currentEditingRowId, setCurrentEditingRowId, id }: ActionsCellProps<T>) {
  return actions && (
    <div className="inline-flex items-center justify-center gap-2">
      {actions.map((action, idx) => (
        currentEditingRowId !== id || action.onClick.length === 1 ? (
          <span
            key={idx}
            className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer"
            onClick={() => {
              setCurrentEditingRowId(id);
              return action.onClick[0](data);
            }}
          >
            {action.icon[0] ? action.icon[0] : action.label[0]}
          </span>
        ) : (
          <span
            key={idx}
            className="text-zinc-400 dark:text-zinc-500 hover:dark:text-white hover:text-black cursor-pointer"
            onClick={() => {
              setCurrentEditingRowId(null);
              return action.onClick[1](data);
            }}
          >
            {action.icon[1] ? action.icon[1] : action.label[1]}
          </span>
        )
      ))}
    </div>
  );
}
