'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Props {
  items: unknown[];
}

export function TableHeaderCheckbox({ items }: Props) {
  const checkbox = useRef<any>(undefined);
  const [checked, setChecked] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<unknown[]>([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedItems.length > 0 && selectedItems.length < items.length;
    setChecked(selectedItems.length === items.length);
    setIndeterminate(isIndeterminate);
    if (checkbox && checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedItems]);

  function toggleAll() {
    setSelectedItems(checked || indeterminate ? [] : items);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }
  useEffect(() => {

    if(!selectedItems){
      setChecked(false);
    }
  }, [selectedItems])

  return (
    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
      <div className="group absolute left-4 top-1/2 -mt-2 grid size-4 grid-cols-1">
        <input
          type="checkbox"
          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
          ref={checkbox}
          checked={checked}
          onChange={toggleAll}
         
        />
        <svg
          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            className="opacity-0 group-has-[:checked]:opacity-100"
            d="M3 8L6 11L11 3.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="opacity-0 group-has-[:indeterminate]:opacity-100"
            d="M3 7H11"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </th>
  )
}
