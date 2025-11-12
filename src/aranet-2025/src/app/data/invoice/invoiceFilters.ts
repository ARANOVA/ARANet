import { FilterField, SearchOperators } from "@aranova/aranova-react-ui";

//añadir campos de filtros y busquedas
export const invoiceFilters: FilterField[] = [
  {
    fieldName: 'invoice_title',
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
  {
    fieldName: 'invoice_date',
    fieldTitle: 'Fecha',
    label: 'Buscar por fecha',
    operator: SearchOperators.equals,
    children: [{
      label: 'Fecha desde',
      type: 'date',
      operator: SearchOperators.gte
    },{
      label: 'Fecha hasta',
      type: 'date',
      operator: SearchOperators.lte
    }],
  },
];


