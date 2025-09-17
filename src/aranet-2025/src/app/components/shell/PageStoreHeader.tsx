'use client';

import { useFormUiStore, useSearchStore } from '@/store';
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
}


export const PageStoreHeader = ({
  main_button,
  add_button_href,
  add_button_text,
  state,
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
    add_button_click: null,
  };

  if (!add_button_href && add_button_text) {
    add_props.add_button_click = () => openDrawer({});
  }

  //Funcion que se ejecuta al hacer click en buscar
  const handleSearch = useCallback(
    (term: string) => {
      const searchTerm = setSearchInputValue(props.model, term);
      const params = new URLSearchParams(window.location.search);
      params.delete('search[]');

      router.replace(`${pathname}?${params}${dumpUrl(props.model)}`);
      setSearchTerm(searchTerm);
    },
    [dumpUrl, pathname, props.model, router, setSearchInputValue, setSearchTerm]
  );

  //Para actualizar la busqueda segun los parametros de la URL
  useEffect(() => {
    const urlSearchValues = searchParams.getAll('search[]');

    if (urlSearchValues.length > 0) {
      const parsed = urlSearchValues.join('; ');
      handleSearch(parsed);
    }
  }, [handleSearch, searchParams]);

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
