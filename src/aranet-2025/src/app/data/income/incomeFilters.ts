import { FilterField, SearchOperators } from "@aranova/aranova-react-ui";

//añadir campos de filtros y busquedas
export const incomeFilters: FilterField[] = [
  {
    fieldName: 'expense_item_name',
    fieldTitle: 'Nombre',
    label: 'Buscar por nombre',
    type: 'search',
    operator: SearchOperators.like,
  },
  {
    fieldName: 'id',
    fieldTitle: 'ID',
    label: 'Buscar por id',
    type: 'search',
    operator: SearchOperators.like,
  },
];


