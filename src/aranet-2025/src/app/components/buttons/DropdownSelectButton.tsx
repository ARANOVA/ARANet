'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu, DropdownShortcut } from '@aranova/aranova-react-ui';
import { DropdownOptions } from '@/interfaces';

interface Props {
  options: DropdownOptions[];
}

export const DropdownSelectButton = ({ options }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // evitar renderizar en SSR

  const disabled = options.length === 0;
  const selected = options.find(option => option.selected);

  return (
    <div className="grow sm:flex-none z-0 text-right">
      <Dropdown>
        <DropdownButton
          outline
          disabled={disabled}
          className='cursor-pointer'
        >
          {selected ? selected.label : 'Selecciona'}
          <ChevronDownIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom end">
          {(options || []).map(op => (
            <DropdownItem key={op.value} onClick={() => console.log(op.value)} className='cursor-pointer text-right'>
              {op.icon}
              <DropdownLabel>{op.label}</DropdownLabel>
              {op.shortcut && (<DropdownShortcut keys={op.shortcut} />)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}