'use client';

import { Filters } from "@/interfaces";
import { useFormUiStore } from "@/store";
import { useFiltersStore, useSearchStore } from "@/store";
import { FormFilters } from "@aranova/aranova-react-ui";
import { usePathname, useRouter } from 'next/navigation';
import { mapSearchModelToFilters } from "@/utils/mappers.utils";

interface Props {
  model: string;
  filters: Filters[];
}

export const ListFiltersForm = (props: Props) => {

  const router = useRouter();
  const pathname = usePathname();
  const { dumpUrl, getSearchesForType } = useSearchStore();
  const { setSearchTerm } = useFormUiStore();
  const formUi = useFormUiStore();
  const { filters, setFilters } = useFiltersStore();
  const { addSearch, removeSearch, setSearches } = useSearchStore();

  //Funcion que se ejecuta al hacer click en buscar
  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('search[]');
    const searches = dumpUrl(props.model);
    const paramsStr = params ? `?${params}` : '';
    console.log({paramsStr, searches})
    const searchesStr = searches ? (paramsStr ? `&${searches}` : `?${searches}`) : '';
    router.replace(`${pathname}${paramsStr}${searchesStr}`);
    setSearchTerm(searches);

  }
  const searchesModel = getSearchesForType(props.model);
  const updateValueFilters = mapSearchModelToFilters(searchesModel, props.filters);
  console.log('filtros seleccionados ',filters)
  return (
    <FormFilters
      model={props.model}
      filters={updateValueFilters}
      ui={{ ...formUi, filters, setFilters, addSearch, removeSearch, setSearches }}
      searchFn={handleSearch}
    />
  );
}