import { FilterField, SearchOperators } from "@aranova/aranova-react-ui";

//añadir campos de filtros y busquedas
export const cashFilters: FilterField[] = [
  {
    fieldName: 'cash_item_name',
    fieldTitle: 'Título',
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


