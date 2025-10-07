'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { FilterField, FormFilters } from "@aranova/aranova-react-ui";
import { useFormUiStore, useFiltersStore, useSearchStore } from "@/store";
import { mapSearchAndFilterValuesToFilters } from "@/utils";
import { dumpUrl } from "@/app/lib/storeFunctions";

interface Props {
  model: string;
  filters: FilterField[];
}

export const ListFiltersForm = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { dumpUrl: dumpUrlStore, getSearchesForType, addSearch, removeSearch, setSearches } = useSearchStore();
  const { setSearchTerm } = useFormUiStore();
  const formUi = useFormUiStore();
  const { filters, setFilters, setFiltersByModel, getFiltersByModel } = useFiltersStore();

  // Funcion que se ejecuta al hacer click en buscar
  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    const searches = getSearchesForType(props.model);
    const filters = getFiltersByModel(props.model);
    params.delete('search[]');

    const query = dumpUrl(searches, [], filters);
    console.log({query})
    const paramsStr = params ? `?${params}` : '';
    const searchesStr = searches ? (paramsStr ? `&${searches}` : `?${searches}`) : '';
    router.replace(`${pathname}${paramsStr}${searchesStr}`);
    setSearchTerm(query);
  }

  const searchesModel = getSearchesForType(props.model);
  const filtersModel = getFiltersByModel(props.model);
  const updateValueFilterField = mapSearchAndFilterValuesToFilters(props.filters, props.model, searchesModel, filtersModel);

  const [ filtersActive, setFiltersActive ] = useState<FilterField[]>(updateValueFilterField);

  // useEffect (() => {
  //   const currentFilterField = getFilterFieldByModel(props.model);
  //   if (currentFilterField.length === 0) {
  //     setFilterFieldByModel(props.model, updateValueFilterField);
  //   }
  // }, [props.model, setFilterFieldByModel, updateValueFilterField]);

  console.log({updateValueFilterField, filters: props.filters})
  return (
    <FormFilters
      model={props.model}
      filters={filtersActive}
      ui={{ ...formUi, filters, setFilters, addSearch, removeSearch, setSearches, setFiltersByModel }}
      searchFn={handleSearch}
    />
  );
}