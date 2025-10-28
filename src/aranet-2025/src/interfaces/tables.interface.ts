export interface RowAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (data: T) => Promise<boolean> | boolean | null | void;
  className?: string;
}
