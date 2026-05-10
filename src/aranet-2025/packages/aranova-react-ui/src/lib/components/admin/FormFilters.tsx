'use client';

import { ChangeEvent, JSX, useEffect, useState } from 'react';
import { Button, Field, Fieldset, Label, Legend, Input, InputGroup, Checkbox } from '../tw';
import { FilterField, FilterDTO, SearchDTO, SearchOperators } from '../../interfaces';
import { ChevronLeftIcon, ChevronRightIcon, EqualsIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { getSearchOperator } from '../../utils';

const icons: Record<string, JSX.Element> = {
  '<=': (
    <>
      <EqualsIcon className='ml-1' />
      <ChevronLeftIcon className="cursor-pointer ml-1" />
    </>
  ),
  '>=': (
    <>
      <EqualsIcon className='ml-1' />
      <ChevronRightIcon className="cursor-pointer ml-1" />
    </>
  )
}


interface FormUi {
  filters: FilterDTO[];
  // setFilters: (filters: FilterDTO[]) => void;
  setFiltersByModel: (model: string, filters: FilterDTO[]) => void;
  // addSearch: (f: SearchDTO) => void;
  // removeSearch: (f: SearchDTO) => void;
  // setSearches: (searches: SearchDTO[]) => void;
}

interface Props {
  model: string;
  ui: FormUi;
  filters: FilterField[];
  searchFn?: () => void;
}

interface SearchValues {
  [key: string]: Record<string, number | string>;
}

export function FormFilters({ model, ui, filters, searchFn }: Props) {
  const [filtersChecked, setfiltersChecked] = useState<FilterDTO[]>(ui.filters);

  const searchesValuesDefault: SearchValues = {};
  filters.forEach((f) => {
    searchesValuesDefault[f.fieldName.toLowerCase()] = {};
    (f.children || [{ label: '', operator: f.operator, value: f.value }]).forEach((child) => {
      console.log({child})
      searchesValuesDefault[f.fieldName.toLowerCase()][(child.operator || 'like').toLowerCase()] = child.value?.toString() || '';
    });
  });
console.log("child", {filters, searchesValuesDefault})
  
  const [searchValues, setSearchValues] = useState<SearchValues>(searchesValuesDefault);

  // useEffect(() => {
  //   ui.setFilters(filtersChecked);
  // }, [filtersChecked]);

  // --- FUNCIONES ---

  const toggleFilter = (
    type: string,
    title: string,
    value_title: string,
    field: string,
    value: string | number | boolean | null,
    operator: SearchOperators = SearchOperators.equals,
  ) => {
    const singleCheckbox = (filters.find(f => f.fieldName === field)?.options?.length ?? 0) <= 2;

    setfiltersChecked((prev) => {
      const exists = prev.some(
        (f) => f.field === field && f.value === value
      );

      if (singleCheckbox) {
        return exists
          ? prev.filter(f => f.field !== field)
          : [...prev.filter(f => f.field !== field), { type, title, value_title, field, value, operator }];
      } else {
        return exists
          ? prev.filter(f => !(f.field === field && f.value?.toString() === value?.toString()))
          : [...prev, { type, title, value_title, field, value, operator }];
      }
    });
  };

  const handleSearchForField = () => {
    console.log("handleSearchForField")
    if (!searchFn) return;
    searchFn();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!searchFn) return;
      searchFn();
    }
  };

  useEffect(() => {
    if (!searchFn) return;
    const timeout = setTimeout(() => { handleSearchForField() }, 1000);
    return () => clearTimeout(timeout);
  }, [searchValues]);

  const handleClick = () => {
    // if (!searchFn) return;
    // // Reset
    // setfiltersChecked([]);
    // setSearchValues({});
    // ui.setSearches([]);
    // searchFn();
  };

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    filter: FilterField,
    op: string
  ): void => {
    console.log("handleOnChange", { event, filter, op });
    const fieldKey = filter.fieldName.toLowerCase();
    const opKey = (op || 'like').toLowerCase();
    // El setSearchValues sirve para el UI, el filterObj para el modelo/localstore
    const searchObj = {
      ...searchValues,
      [fieldKey]: {
        ...searchValues[fieldKey],
        [opKey]: event.target.value,
      },
    };
    // Deja sólo los válidos para el modelo
    const filterObj: FilterDTO[] = [];
    Object.entries(searchObj)
      .forEach((v: any[]) => {
        Object.entries(v[1]).filter((a: any) => {
          const op = getSearchOperator(a[0]);
          const value_title = filters.find(f => f.fieldName.toLowerCase() === v[0] || f.fieldName === filter.fieldName)?.fieldTitle || v[0];
          if (a[1] !== '') {
            filterObj.push({
              type: model,
              field: v[0],
              operator: getSearchOperator(a[0]),
              value: a[1],
              value_title: value_title, // Recuperar desde definición
              title: `${op === 'like' ? `%${a[1]}%` : op + a[1]}`,
            });
          }
        });
      });
    ui.setFiltersByModel(model, filterObj);

    setSearchValues(searchObj);
  }

  return (
    <form className="space-y-6">
      <Button onClick={handleClick} className="w-full max-w-xs">
        Borrar Filtros
      </Button>

      {filters?.map((section) => (
        <div key={section.fieldName}>
          {section.children ? (
            section.children.map((child: any, idx: number) => (
              <Field className='mt-3' key={`${section.fieldName}-${child.operator}`}>
                {idx === 0 && <Label>{section.label}</Label>}
                <InputGroup>
                {icons[child.operator || '<=']}
                  <Input
                    value={searchValues[section.fieldName.toLowerCase()]?.[(child.operator || '<=').toLowerCase()] || ''}
                    type={child.type || 'date'}
                    placeholder={child.label}
                    onChange={(e) => handleOnChange(e, section, child.operator || '<=')}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onBlur={() => handleSearchForField()}
                  />
                </InputGroup>
              </Field>
            ))
          ) : section.type === 'search' ? (
            <Field>
              <Label>{section.label}</Label>
              <InputGroup>
                <MagnifyingGlassIcon className="cursor-pointer" />
                <Input
                  value={searchValues[section.fieldName.toLowerCase()]?.[(section.operator || 'like').toLowerCase()] || ''}
                  type="search"
                  placeholder={section.label}
                  onChange={(e) => handleOnChange(e, section, section.operator)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onBlur={() => handleSearchForField()}
                />
              </InputGroup>
            </Field>
          ) : (
            <Fieldset className="border p-4 rounded-md border-zinc-300 dark:border-zinc-700 my-2">
              <Legend className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                {section.label}
              </Legend>
              {section.options && section.options.length > 0 ? (
                section.options.length > 2 ? (
                  <div className="flex flex-col gap-2">
                    {section.options.map((option, idx) => {
                      const isChecked = filtersChecked.some(
                        (f) => f.field === section.fieldName && f.value?.toString() === option.value?.toString()
                      );
                      return (
                        <div className="flex items-center" key={option.label}>
                          <Checkbox
                            className="mr-2"
                            id={`filter-${section.fieldName}-${idx}`}
                            checked={isChecked}
                            onChange={() =>
                              toggleFilter(
                                model,
                                option.label,
                                section.label,
                                section.fieldName,
                                option.value
                              )
                            }
                          />
                          <h1>{option.label}</h1>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex">
                    {section.options.map((option, idx) => {
                      const isChecked = filtersChecked.some(
                        (f) => f.field === section.fieldName && f.value?.toString() === option.value?.toString()
                      );
                      return (
                        <div className="flex items-center mr-3" key={option.label}>
                          <Checkbox
                            className="mr-2"
                            id={`filter-${section.fieldName}-${idx}`}
                            checked={isChecked}
                            onChange={() =>
                              toggleFilter(
                                model,
                                option.label,
                                section.label,
                                section.fieldName,
                                option.value
                              )
                            }
                          />
                          <h1>{option.label}</h1>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
                  No hay opciones disponibles
                </p>
              )}
            </Fieldset>
          )}
        </div>
      ))}
    </form>
  );
}
