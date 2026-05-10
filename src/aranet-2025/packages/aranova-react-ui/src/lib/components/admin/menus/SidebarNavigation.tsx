'use client';

import { usePathname } from 'next/navigation';
import { Menu } from '../../../interfaces';
import {
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '../../tw';

interface Props {
  navigation: Menu[];
}

export const SidebarNavigation = ({ navigation }: Props) => {
  const pathname = usePathname();

  return (
    <div>
      {navigation.map(menu => {
        if (menu.items.length == 0) {
          return;
        }
        return (
          <SidebarSection key={menu.header}>
            <SidebarHeading>{menu.header}</SidebarHeading>
            {(menu.items.length > 0) && (
              <SidebarItem
                key={menu.items[0].href}
                href={menu.items[0].href}
                current={pathname.startsWith(menu.items[0].href)}
              >
                {menu.items[0].icon}
                <SidebarLabel>{menu.items[0].name}</SidebarLabel>
              </SidebarItem>
            )}
            {(menu.items || []).map(item => {
              if (!item.children) {
                return null
              }
              return (item.children || []).map(op => (
                <SidebarItem
                  key={op.href}
                  href={op.href}
                  current={pathname.startsWith(op.href)}
                >
                  {op.icon}
                  <SidebarLabel>{op.name}</SidebarLabel>
                </SidebarItem>
              ));
            })}
          </SidebarSection>
        );
      })}
    </div>
  );
};
