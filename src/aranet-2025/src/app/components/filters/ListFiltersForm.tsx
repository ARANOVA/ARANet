'use client';

import { useFormUiStore } from "@/store";
import { useFilterFieldStore, useSearchStore } from "@/store";
import { FilterField, FormFilterField } from "@aranova/aranova-react-ui";
import { usePathname, useRouter } from 'next/navigation';
import { mapSearchModelToFilterField } from "@/utils/mappers.utils";
import { useEffect, useState } from "react";
import { get } from "http";

interface Props {
  model: string;
  FilterField: FilterField[];
}

export const ListFilterFieldForm = (props: Props) => {

  const router = useRouter();
  const pathname = usePathname();
  const { dumpUrl, getSearchesForType } = useSearchStore();
  const { setSearchTerm } = useFormUiStore();
  const formUi = useFormUiStore();
  const { FilterField, setFilterField, setFilterFieldByModel, getFilterFieldByModel } = useFilterFieldStore();
  const { addSearch, removeSearch, setSearches } = useSearchStore();

  //Funcion que se ejecuta al hacer click en buscar
  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    console.log({params, d: props.model})
    params.delete('search[]');
    const searches = dumpUrl(props.model);
    const paramsStr = params ? `?${params}` : '';
    const searchesStr = searches ? (paramsStr ? `&${searches}` : `?${searches}`) : '';
    router.replace(`${pathname}${paramsStr}${searchesStr}`);
    setSearchTerm(searches);
  }

  const searchesModel = getSearchesForType(props.model);
  const FilterFieldModel = getFilterFieldByModel(props.model);
  const updateValueFilterField = mapSearchModelToFilterField(searchesModel, FilterFieldModel, props.FilterField);

  const [ FilterFieldActive, setFilterFieldActive ] = useState<FilterField[]>(updateValueFilterField);

  // useEffect (() => {
  //   const currentFilterField = getFilterFieldByModel(props.model);
  //   if (currentFilterField.length === 0) {
  //     setFilterFieldByModel(props.model, updateValueFilterField);
  //   }
  // }, [props.model, setFilterFieldByModel, updateValueFilterField]);

  return (
    <FormFilterField
      model={props.model}
      FilterField={FilterFieldActive}
      ui={{ ...formUi, FilterField, setFilterField, addSearch, removeSearch, setSearches, setFilterFieldByModel }}
      searchFn={handleSearch}
    />
  );
}