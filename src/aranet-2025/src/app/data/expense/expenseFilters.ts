import { FilterField, SearchOperators } from "@aranova/aranova-react-ui";

//añadir campos de filtros y busquedas
export const expenseFilters: FilterField[] = [
  {
    fieldName: 'expense_item_name',
    fieldTitle: 'Nombre',
    label: 'Buscar por nombre',
    type: 'search',
    operator: SearchOperators.equals,
  },
  {
    fieldName: 'id',
    fieldTitle: 'ID',
    label: 'Buscar por id',
    type: 'number',
    operator: SearchOperators.equals,
  },
];


