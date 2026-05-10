'use client';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/16/solid';
import { Button, Heading, Input, InputGroup, Link } from '../tw';
import { useEffect, useState } from 'react';

import {
  DocumentArrowDownIcon,
  PencilSquareIcon,
  PrinterIcon,
} from '@heroicons/react/20/solid';
import { StatusBagde } from '../elements';

interface Props {
  title: string;
  subtitle?: string;
  state?: {
    value: string;
    title: string;
    suffix?: string;
  };
  add_button_text?: string;
  add_button_href?: string;
  add_button_icon?: React.ReactNode;
  add_button_click?: () => void;
  import_button_text?: string;
  import_button_href?: string;
  import_button_click?: () => void;
  search_placeholder?: string;
  nb_items?: number;
  searchFn?: (search: string) => void;
  search_value: string;
  print_button_text?: string;
  print_button_click?: () => void;
  edit_button_text?: string;
  edit_button_href?: string;
  main_button?: React.ReactNode;
  print_button?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  state,
  add_button_text,
  add_button_href,
  add_button_icon,
  add_button_click,
  import_button_text,
  import_button_href,
  import_button_click,
  searchFn,
  search_placeholder,
  nb_items,
  search_value,
  print_button_text,
  print_button_click,
  edit_button_text,
  edit_button_href,
  main_button,
  print_button,
}: Props) {
  const [search, setSearch] = useState(() =>
    search_value.length > 0 ? search_value : ''
  );

  //Para actualizar inputs segun la URL
  useEffect(() => {
    setSearch(search_value);
  }, [search_value]);

  //Enviar datos
  const handleSearch = () => {
    if (!searchFn) return;
    searchFn(search);
  };

  //presionar enter para buscar
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4 mb-4">
      <div className="max-sm:w-full sm:flex-1 flex flex-wrap items-center gap-2">
        <div className="flex-grow">
          <Heading>
            <div className="flex items-center flex-1 gap-4 print:gap-0">
              {title}
              {nb_items !== undefined ? <span> ({nb_items})</span> : null}
              {edit_button_text && edit_button_href && (
                <Link
                  title={edit_button_text}
                  className="print:hidden flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
                  href={edit_button_href}
                >
                  <PencilSquareIcon className="w-6 h-6" />
                </Link>
              )}
              {state && <StatusBagde state={state} />}
            </div>
          </Heading>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
        <div className="flex justify-end grow sm:flex-none">
          <div className="flex gap-4">
            {search_placeholder && (
              <InputGroup className="grow sm:flex-none z-0">
                <MagnifyingGlassIcon
                  onClick={() => handleSearch()}
                  className="cursor-pointer"
                />
                <Input
                  name="search"
                  value={search || ''}
                  type="search"
                  placeholder={search_placeholder}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSearch}
                  className="min-w-64"
                />
              </InputGroup>
            )}
            {main_button}
            {add_button_text && add_button_href && (
              <Button
                href={add_button_href || '#'}
                color="dark/white"
                className="cursor-pointer print:hidden"
              >
                {add_button_icon || <PlusIcon />}
                <span className="hidden sm:block">{add_button_text}</span>
              </Button>
            )}
            {add_button_text && add_button_click && (
              <Button
                onClick={add_button_click}
                color="dark/white"
                className="cursor-pointer"
              >
                <PlusIcon />
                <span className="hidden md:block">{add_button_text}</span>
              </Button>
            )}
            {import_button_text && import_button_href && (
              <Button
                href={import_button_href || '#'}
                color="dark/white"
                className="cursor-pointer"
              >
                <DocumentArrowDownIcon />
                <span className="hidden md:block">{import_button_text}</span>
              </Button>
            )}
            {import_button_text && import_button_click && (
              <Button
                onClick={import_button_click}
                color="dark/white"
                className="cursor-pointer"
              >
                <DocumentArrowDownIcon />
                <span className="hidden md:block">{import_button_text}</span>
              </Button>
            )}
            {print_button_text && print_button_click && (
              <Button
                className="cursor-pointer hidden md:flex print:hidden"
                color="dark/zinc"
                onClick={() => print_button_click()}
              >
                <PrinterIcon />
                <span className="hidden md:block">{print_button_text}</span>
              </Button>
            )}
            {print_button}
            {/* {pr && (
              <Link
                title={editText}
                className="print:hidden flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                href={editLink}
              >
                <PencilSquareIcon className="w-6 h-6" />
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
