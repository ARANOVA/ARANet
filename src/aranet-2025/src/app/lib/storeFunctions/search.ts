
import { FilterDTO, SearchDTO, SearchOperators } from '@aranova/aranova-react-ui';
import { fieldOperators } from '../createQueryFunctions';


const isSafeValue = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\.<>=-]+$/;
  return regex.test(value);
};

const groupSearches = (searches: SearchDTO[]): Record<string, string[]> => {
  const grouped: Record<string, string[]> = {};

  for (const search of searches) {
    const field = search.field?.trim();
    const operator = search.operator?.trim();
    const rawValue = search.value?.toString().trim();

    if (!field || !rawValue || !isSafeValue(rawValue)) continue;

    const printableOperator = SearchOperators[operator as keyof typeof SearchOperators || 'like'];
    if (printableOperator === undefined) continue;

    if (!grouped[field]) grouped[field] = [];

    if (printableOperator === SearchOperators.like) {
      grouped[field].push(`${rawValue}`);
    } else {
      grouped[field].push(`${printableOperator}${rawValue}`);
    }
  }
  return grouped;
};

// Añadir una nueva búsqueda
export const addSearch = (currentSearches: SearchDTO[], search: SearchDTO): SearchDTO[] => {

  const normalizedSearch: SearchDTO = {
    ...search,
    field: search.field.toLowerCase(),
    operator: search.operator,
  };

  const filtered = currentSearches.filter((s) =>
    !(
      s.field.toLowerCase() === normalizedSearch.field &&
      s.operator === normalizedSearch.operator &&
      s.type === normalizedSearch.type
    )
  ).map((s) => ({
    ...s,
    field: s.field.toLowerCase(),
    operator: s.operator
  }));

  return [...filtered, normalizedSearch];
};


export const removeSearch = (currentSearches: SearchDTO[], search: SearchDTO | null | undefined): SearchDTO[] => {
  if (!search || Array.isArray(search)) return currentSearches;

  if (!search.field || !search.operator) {
    throw new Error('Search field and operator are required');
  }

  const normalizedSearch: SearchDTO = {
    ...search,
    field: search.field.toLowerCase(),
    operator: SearchOperators[search.operator.toLowerCase() as keyof typeof SearchOperators],
  };

  const filtered = currentSearches.filter((s) => {
    const normalizedField = s.field.toLowerCase();
    const operatorKey = s.operator.toLowerCase() as keyof typeof SearchOperators;
    const normalizedOperator = SearchOperators[operatorKey];

    return !(
      normalizedField === normalizedSearch.field &&
      normalizedOperator === normalizedSearch.operator &&
      s.type === normalizedSearch.type
    );
  });

  return filtered;
};

// Setear las busquedas
export const setSearches = (currentSearches: SearchDTO[], searches: SearchDTO[]): SearchDTO[] => {

  if (searches.length === 0) return currentSearches;

  const normalizedSearches = searches.map((s) => ({
    ...s,
    field: s.field.toLowerCase(),
    operator: SearchOperators[s.operator.toLowerCase() as keyof typeof SearchOperators],
  }));

  const filtered = currentSearches.filter((s) => {
    const normalizedField = s.field.toLowerCase();
    const operatorKey = s.operator.toLowerCase() as keyof typeof SearchOperators;
    const normalizedOperator = SearchOperators[operatorKey];

    return !normalizedSearches.some(
      (search) =>
        search.field === normalizedField &&
        search.operator === normalizedOperator &&
        search.type === s.type
    );
  });
  return [...filtered, ...normalizedSearches];
};

// Crear URL
export const dumpUrl = (searches: SearchDTO[], andFields: string[] = [], filters: FilterDTO[] = []): string => {
  const cSearches = !Array.isArray(searches) || searches.length === 0 ? [] : searches;
  const cFilters = !Array.isArray(filters) || filters.length === 0 ? [] : filters;

  const grouped = groupSearches(cSearches);
  const parts: string[] = [];

  Object.entries(grouped).forEach(([field, values]) => {
    if (values.length === 0) return;

    if (andFields.includes(field)) {
      values.forEach((v) => {
        parts.push(`search[]=${field !== 'all' ? field + ':' : ''}${v}`);
      });
    } else {
      parts.push(`search[]=${field !== 'all' ? field + ':' : ''}${values.join(',')}`);
    }
  });

  return parts.join('&');
};

// Obtener valor de searches para input
export function getSearchInputValue(searches: SearchDTO[], andFields: string[]): string {
  if (!Array.isArray(searches) || searches.length === 0) return '';

  const grouped = groupSearches(searches);
  const parts: string[] = [];

  Object.entries(grouped).forEach(([field, values]) => {
    if (values.length === 0) return;

    if (andFields.includes(field)) {
      values.forEach((v) => {
        parts.push(`${field !== 'all' ? field + ':' : ''}${v}`);
      });
    } else {
      parts.push(`${field !== 'all' ? field + ':' : ''}${values.join(',')}`);
    }
  });
  return parts.join('; ');
}

export function setSearchInputValues(type: string, searchTerm: string): SearchDTO[] {
  if (!searchTerm) return [];
  const results: SearchDTO[] = [];

  searchTerm.split(";").forEach((section) => {
    if (!section.trim()) return;

    let field = "all";
    let valuesRaw = section.trim();

    if (section.includes(":")) {
      const [fieldRaw, valuesPart] = section.trim().split(":");
      field = fieldRaw.trim().toLowerCase();
      valuesRaw = valuesPart;
    }

    const values = valuesRaw.split(',').map(v => v.trim()).filter(Boolean);
    if (values.length === 0) return;

    const operator = '';

    values.forEach((v) => {
      if (!isSafeValue(v)) return;

      const { operator: opFromValue, value } = fieldOperators(v);
      const finalOperator = operator || opFromValue === '' ? SearchOperators.like : opFromValue;
      // Comprobar si ya existe un SearchDTO con ese field, operator y type
      const alreadyExists = results.some(search =>
        search.field.toLowerCase() === field.toLowerCase() &&
        search.operator === finalOperator &&
        search.type === type
      );

      if (!alreadyExists) {
        results.push({
          type,
          field,
          operator: finalOperator,
          value: value || v,
        });
      }
    });
  });

  return results;
}
