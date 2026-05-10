'use client';

import { usePathname } from 'next/navigation';
import { Menu } from '../../../interfaces';
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
} from '../../tw';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface Props {
  navigation: Menu[];
  className?: string;
}

export const NavbarNavigation = ({ navigation, className }: Props) => {
  const pathname = usePathname();

  return (
    <div className={clsx('flex flex-row gap-x-2', className)}>
      {navigation.map((menu) => {
        return (
          <NavbarSection key={menu.header}>
          {(menu.items || []).map((item) => {
            if (item.href === null) return null;
            const isActive = !!item.href && pathname.startsWith(item.href);

            if (!item.children) {
              return (
                <NavbarItem
                  key={item.href}
                  href={item.href}
                  current={isActive}
                >
                  {item.icon}
                  <NavbarLabel>{item.name}</NavbarLabel>
                </NavbarItem>
              );
            } else {
              return (
                <Dropdown key={item.href}>
                  <DropdownButton as={NavbarItem}>
                    <NavbarLabel>{menu.header}</NavbarLabel>
                    <ChevronDownIcon />
                  </DropdownButton>
                  <DropdownMenu className="max-w-64 min-w-48" anchor={ menu.anchor || 'bottom end' }>
                    <DropdownItem key={item.href} href={item.href}>
                      <DropdownLabel>{item.label || item.name}</DropdownLabel>
                    </DropdownItem>
                    {(item.children || []).map(op => {
                      if (op.href === null) return null;
                      return (
                        <DropdownItem key={op.href} href={op.href}>
                          <DropdownLabel>{op.label || op.name}</DropdownLabel>
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              )
            }
          })}
        </NavbarSection>
        );
      })}
    </div>
  );
};
