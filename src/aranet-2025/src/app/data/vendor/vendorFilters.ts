import { Filters } from "@/interfaces";
import { SearchOperators } from "@aranova/aranova-react-ui";

//añadir campos de filtros y busquedas
export const vendorFilters: Filters[] = [
  {
    fieldName: 'vendor_company_name',
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


