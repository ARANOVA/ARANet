'use client';

import { useFormUiStore, useSearchStore } from '@/store';
import { verifactuFlow } from '@/utils/server/verifactu.utils';
import { PageHeader } from '@aranova/aranova-react-ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

interface Props {
  title: string;
  state?: number;
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
  data?: unknown;
}

type Fn = () => void;

export const PageStoreHeader = ({
  main_button,
  add_button_href,
  add_button_text,
  print_button_text,
  state,
  data,
  ...props
}: Props) => {
  const { setSearchTerm, openDrawer } = useFormUiStore();
  const { getSearchInputValue, setSearchInputValue, dumpUrl } = useSearchStore();
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
    const printClick = () => {
      // Test verifactu
      console.log('print_button_click');
      verifactuFlow(data as any).then(console.log).catch(console.log);
    };
    add_props.print_button_click = printClick; //() => window.print();
  }

  // Funcion que se ejecuta al hacer click en buscar
  const handleSearch = useCallback(
    (term: string) => {
      const searchTerm = setSearchInputValue(props.model, term);
      const params = new URLSearchParams(window.location.search);
      params.delete('search[]');
      const searches = dumpUrl(props.model);
      const paramsStr = params.toString() ? `?${params.toString()}` : '';
      const searchesStr = searches ? (paramsStr ? `&${searches}` : `?${searches}`) : '';
      router.replace(`${pathname}${paramsStr}${searchesStr}`);
      setSearchTerm(searchTerm);
    },
    [dumpUrl, pathname, props.model, router, setSearchInputValue, setSearchTerm]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete('search[]');
    const searches = dumpUrl(props.model);
    const paramsStr = params.toString() ? `?${params.toString()}` : '';
    const searchesStr = searches ? (paramsStr ? `&${searches}` : `?${searches}`) : '';
    router.replace(`${pathname}${paramsStr}${searchesStr}`);
  }, [searchParams, dumpUrl, getSearchInputValue, pathname, props.model, router, handleSearch]);

  return (
    <>
      <PageHeader
        {...props}
        search_value={getSearchInputValue(props.model)}
        searchFn={handleSearch}
        state={state}
        main_button={main_button}
        {...add_props}
      />
    </>
  );
};
