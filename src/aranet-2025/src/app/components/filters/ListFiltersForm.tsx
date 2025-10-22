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
  const { getSearchesForType } = useSearchStore();
  const { setSearchTerm } = useFormUiStore();
  const formUi = useFormUiStore();
  const { filters, setFiltersByModel, getFiltersByModel } = useFiltersStore();

  // Funcion que se ejecuta al hacer click en buscar
  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    const searches = getSearchesForType(props.model);
    const filters = getFiltersByModel(props.model);
    params.delete('search[]');
    const query = dumpUrl(searches, [], filters);
    const paramsStr = params.values.length > 0 ? `?${params}` : '';
    const searchesStr = query ? (paramsStr ? `&${query}` : `?${query}`) : '';
    // router.replace(`${pathname}${paramsStr}${searchesStr}`);
    // setSearchTerm(query);
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
      ui={{ ...formUi, filters, setFiltersByModel }}
      searchFn={handleSearch}
    />
  );
}