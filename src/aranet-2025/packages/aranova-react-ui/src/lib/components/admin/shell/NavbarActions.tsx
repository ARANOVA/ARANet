'use client';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu } from '../../../interfaces';
import { Dropdown, DropdownButton, NavbarItem, DropdownItem, DropdownLabel, DropdownMenu, NavbarLabel } from '../../tw';
import { usePathname } from 'next/navigation';

interface Props {
  actions?: Menu[];
}

export const NavbarActions = ({
  actions,
}: Props) => {
  const pathname = usePathname();
  return (
    <>
    {(actions || []).map((menu) => {

      return (menu.items || []).map((item) => {

        if (!item.children) {
          const isActive = pathname === item.href;
          return (
            <NavbarItem
              key={item.href}
              href={item.href}
              current={isActive}
            >
              {item.icon || item.component}
              {item.label && <NavbarLabel className=''>{item.label}</NavbarLabel>}
            </NavbarItem>
          );
        } else {
          return (
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                {item.icon}
                <ChevronDownIcon />
              </DropdownButton>

              <DropdownMenu className="min-w-24 max-w-64" anchor={ 'top end' }>
                {item.children.map((subitem, idx) => {
                  return (
                    <DropdownItem href={subitem.href} >
                      {subitem.icon}
                      <DropdownLabel>{subitem.label}</DropdownLabel>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>

            </Dropdown>
          );
        }
      })
    })}
  </>
  );
};
