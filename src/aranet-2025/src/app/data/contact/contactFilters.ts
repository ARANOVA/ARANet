import { FilterField, SearchOperators } from "@aranova/aranova-react-ui";

//añadir campos de filtros y busquedas
export const contactFilters: FilterField[] = [
  {
    fieldName: 'contact_first_name',
    fieldTitle: 'Nombre',
    label: 'Buscar por nombre',
    type: 'search',
    operator: SearchOperators.equals,
  },
  {
    fieldName: 'contact_last_name',
    fieldTitle: 'Apellido',
    label: 'Buscar por apellido',
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


