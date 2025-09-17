import { FilterDTO, ListResponse } from "@aranova/aranova-react-ui";
import { logError } from "../../logger";

type EnumModels = 'no-existe';

export const getListDataByModel = async <T>(
  model: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  taxonomy = "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  status = "",
  page = 1,
  limit = 3,
  sortField = '',
  sortDir: '' | 'asc' | 'desc' = '',
  searchTerm = "",
  filters: FilterDTO[] = [],
): Promise<ListResponse<T>> => {
  // Filtrar filtros válidos y no vacíos
  const VALID_FIELDS: Record<string, string[]> = {
    // calendarios: calendariosFilters.map(f => f.fieldName),
    // plantilla: plantillaFilters.map(f => f.fieldName),
  };

  const rightFilters = filters
    .filter((f: FilterDTO) => {
      // Comprobar campo válido
      if ((model in VALID_FIELDS ? VALID_FIELDS[model] : []).indexOf(f.field) === -1) {
        return false;
      }
      // Comprobar valor válido
      if (f.value === undefined || f.value === null || f.value === '') {
        return false;
      }
      return true;
    })
    .reduce((acc, f) => {
      const field = f.field;
      const value = (f.value === null ? '0' : f.value).toString();
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(value);
      return acc;
    }, {} as Record<string, string[]>);

  // Construir parámetro filters para la URL
  const filtersParam = Object.entries(rightFilters)
    .map(([field, values]) => encodeURIComponent(`${field}|||${values.join(',')}`))
    .join('&filter[]=');

  const endpoint = `/api/${model}?page=${page}&limit=${limit}&sortField=${sortField}&sortDir=${sortDir}${searchTerm ? '&' + searchTerm : ''}${filtersParam ? `&filter[]=${filtersParam}` : ''}`;

  try {
    const res = await fetch(endpoint);
    const json = await res.json();
    return json as ListResponse<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logError(`Error fetching ${endpoint}: ${err}`);
    return {
      statusCode: 500,
      error: `${err}`,
    };
  }
};
