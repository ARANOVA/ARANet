'use client';

import { Menu } from '../../../interfaces';
import {
  SidebarSection,
  SidebarItem,
  SidebarLabel,
  SidebarDivider,
  SidebarHeading,
} from '../../tw';
import { usePathname } from 'next/navigation';

interface Props {
  actions?: Menu[];
}

export const SidebarActions = ({ actions }: Props) => {
  const pathname = usePathname();

  return (actions || []).map(menu => {
    return (
      <SidebarSection key={menu.header}>
        <SidebarHeading>{menu.header}</SidebarHeading>
        {(menu.items || []).map(item => {
          if (!item.children) {
            const isActive = pathname === item.href;
            return (
              <SidebarItem key={item.name} href={item.href} current={isActive}>
                {item.icon}
                <SidebarLabel>{item.label || item.name}</SidebarLabel>
                   <span className='font-bold text-md'> {item.count && item.count > 0 ? `(${item.count})` : ''} </span>
              </SidebarItem>
            );
          } else {
            {
              item.children.map((subitem, idx) => {
                const isActive = pathname === subitem.href;
                return (
                  <SidebarItem
                    key={subitem.name}
                    href={subitem.href}
                    current={isActive}
                  >
                    {subitem.icon}
                    <SidebarLabel>{subitem.label || subitem.name}</SidebarLabel>
                   <span className='font-bold text-md'> {item.count && item.count > 0 ? `(${item.count})` : ''} </span>
                  </SidebarItem>
                );
              });
            }
          }
        })}
      </SidebarSection>
    );
  });
};
