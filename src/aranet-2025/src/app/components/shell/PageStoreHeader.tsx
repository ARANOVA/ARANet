'use client';

import { dumpUrl } from '@/app/lib/storeFunctions';
import { aranet_invoice_verifactu } from '@/interfaces';
import { useFiltersStore, useFormUiStore, useSearchStore } from '@/store';
import { PageHeader } from '@aranova/aranova-react-ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  title: string;
  state?: {
    value: string;
    title: string;
    suffix?: string;
  },
  subtitle?: string;
  model: string;
  search_placeholder?: string;
  nb_items?: number;
  search_value?: string | string[];
  main_button?: React.ReactNode;
  add_button_text?: string;
  add_button_href?: string;
  add_button_icon?: React.ReactNode;
  edit_button_text?: string;
  edit_button_href?: string;
  print_button_text?: string;
  print_button?: React.ReactNode;
  data?: aranet_invoice_verifactu;
}

type Fn = () => void;

export const PageStoreHeader = ({
  main_button,
  add_button_href,
  add_button_text,
  print_button_text,
  print_button,
  state,
  ...props
}: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  
  const { setSearchTerm, openDrawer } = useFormUiStore();
  const { filters, setFiltersByModel, getFiltersByModel } = useFiltersStore();  
  const { getSearchInputValue, setSearchInputValue, dumpUrl: dumpUrlStore, getSearchesForType } = useSearchStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const add_props: Record<string, string | undefined | null | Fn> = {
    add_button_text,
    add_button_href,
    print_button_text,
    add_button_click: null,
    print_button_click: null,
  };

  if (!add_button_href && add_button_text) {
    add_props.add_button_click = () => openDrawer({});
  }

  if (print_button_text) {
    add_props.print_button_click = () => window.print();
  }

  // Funcion que se ejecuta al hacer click en buscar
  const handleSearch = useCallback(
    (term: string) => {
      console.log({term})
      // const searchTerm = setSearchInputValue(props.model, term);
      // const params = new URLSearchParams(window.location.search);
      // params.delete('search[]');
      // const searches = dumpUrl(props.model);
      // const paramsStr = params.toString() ? `?${params.toString()}` : '';
      // const searchesStr = searches ? (paramsStr ? `&${searches}` : `?${searches}`) : '';
      // router.replace(`${pathname}${paramsStr}${searchesStr}`);
      // setSearchTerm(searchTerm);
    },
    [pathname, props.model, router, setSearchInputValue, setSearchTerm]
  );

  // const filtersFromStore = useFiltersStore(state => state.getFiltersByModel(props.model));
  const filtersFromStore = getFiltersByModel(props.model);
  // const searchesFromStore = useSearchStore(state => state.getSearchesForType(props.model));
  const searchesFromStore = getSearchesForType(props.model);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete('search[]');
    const query = dumpUrl(searchesFromStore, [], filtersFromStore);
    const paramsStr = params.values.length > 0 ? `?${params}` : '';
    const searchesStr = query ? (paramsStr ? `&${query}` : `?${query}`) : '';
    console.log({searchesStr})
    // router.replace(`${pathname}${paramsStr}${searchesStr}`);
    // setSearchTerm(query);
    return () => {
      console.log("END");
    };
  }, []);

  return (
    <>
      <PageHeader
        {...props}
        search_value={getSearchInputValue(props.model)}
        searchFn={handleSearch}
        state={state}
        main_button={main_button}
        print_button={print_button}
        {...add_props}
      />
    </>
  );
};
