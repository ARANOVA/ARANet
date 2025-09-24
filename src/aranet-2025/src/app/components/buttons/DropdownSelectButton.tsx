'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu, DropdownShortcut } from '@aranova/aranova-react-ui';
import { DropdownOptions } from '@/interfaces';

interface Props {
  options: DropdownOptions[];
}

export const DropdownSelectButton = ({ options }: Props) => {
  const disabled = options.length === 0;

  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<DropdownOptions | undefined>(options.find(option => option.selected));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // evitar renderizar en SSR

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
            <DropdownItem key={op.value} onClick={() => setSelected(op)} className='cursor-pointer text-right'>
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