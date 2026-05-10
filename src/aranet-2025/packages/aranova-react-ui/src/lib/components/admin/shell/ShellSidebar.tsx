'use client';

import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { AccountDropdownMenu } from '../helpers';
import { Menu } from '../../../interfaces';
import {
  Avatar,
  Dropdown,
  DropdownButton,
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
} from '../../tw';
import { SidebarNavigation } from '../menus';
import { SidebarActions } from './SidebarActions';
import Link from 'next/link';

interface Props {
  logo: {
    light: string;
    dark: string;
  };
  title: string;
  subtitle?: string;
  username: string;
  email: string;
  avatar?: string;
  profileUrl?: string;
  deleteSessionFn: () => void;
  navigation: Menu[];
  actions?: Menu[];
}

export const ShellSidebar = ({
  title,
  subtitle,
  logo,
  profileUrl,
  avatar,
  username,
  email,
  deleteSessionFn,
  navigation,
  actions,
}: Props) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <h3 className="text-lg/8 sm:text-base/8 font-medium text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </h3>
        )}
      </SidebarHeader>
      <SidebarBody className="flex flex-col flex-1">
  <div className="flex-1 flex flex-col justify-between">
    <div>
      <SidebarNavigation navigation={navigation} />
      <SidebarDivider />
      <SidebarActions actions={actions} />
      <SidebarDivider />
    </div>

    <Link href="/" className="self-center mb-4">
      <img
        src={logo.light}
        className="block dark:hidden object-contain h-[36px]"
        alt="Logo claro"
      />
      <img
        src={logo.dark}
        className="hidden dark:block object-contain h-[36px]"
        alt="Logo oscuro"
      />
    </Link>
  </div>
</SidebarBody>


      <SidebarFooter>
        
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar src={avatar} className="size-10" alt="" />
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                  {username}
                </span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                  {email}
                </span>
              </span>
            </span>
            <ChevronUpIcon />
          </DropdownButton>
          <AccountDropdownMenu
            anchor="top start"
            username={username}
            deleteSessionFn={deleteSessionFn}
            profileUrl={profileUrl}
          />
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  );
};
