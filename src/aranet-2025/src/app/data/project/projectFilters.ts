import { FilterField, SearchOperators } from "@aranova/aranova-react-ui";

//añadir campos de filtros y busquedas
export const projectFilters: FilterField[] = [
  {
    fieldName: 'project_name',
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


