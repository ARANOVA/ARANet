import { Filters } from "@/interfaces";
import { SearchOperators } from "@aranova/aranova-react-ui";

//añadir campos de filtros y busquedas
export const userFilters: Filters[] = [
  {
    fieldName: 'username',
    label: 'Buscar por nombre',
    type: 'search',
    operator: SearchOperators.like,
  },
  {
    fieldName: 'id',
    label: 'Buscar por id',
    type: 'search',
    operator: SearchOperators.like,
  },
];


