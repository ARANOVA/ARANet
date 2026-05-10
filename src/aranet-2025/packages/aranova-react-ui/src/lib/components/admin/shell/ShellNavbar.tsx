'use client';

import { Avatar, Dropdown, DropdownButton, Link, Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from "../../tw";
import { AccountDropdownMenu } from "../helpers";
import { Menu } from '../../../interfaces';
import { NavbarNavigation } from '../menus/NavbarNavigation';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { NavbarActions } from "./NavbarActions";

interface Props {
  username: string;
  logo: {
    light: string;
    dark: string;
  };
  avatar?: string;
  profileUrl?: string;
  navigation?: Menu[];
  actions?: Menu[];
  deleteSessionFn: () => void;
}

export const ShellNavbar = ({ username, avatar, profileUrl, logo, deleteSessionFn, navigation, actions }: Props) => {
  return (
    <Navbar>

      <NavbarSection className="max-lg:hidden">
        <Link href={"/"}>
        <img
          src={logo.light}
          className="block dark:hidden object-contain h-[36px]"
        />

        {/* Logo oscuro (tema oscuro) */}
        <img
          src={logo.dark}
          className="hidden dark:block object-contain h-[36px]"
        />
        </Link>
      </NavbarSection>

      {navigation && <NavbarNavigation className="max-lg:hidden" navigation={navigation} />}
      <NavbarSpacer />

      <NavbarSection className="hidden min-sm:flex">

        <NavbarActions actions={actions} />

        {actions && <NavbarDivider />}

        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <Avatar src={avatar} />
            <NavbarLabel>{username}</NavbarLabel>
            <ChevronDownIcon />
          </DropdownButton>

          <AccountDropdownMenu
            anchor="bottom end"
            username={username}
            deleteSessionFn={deleteSessionFn}
            profileUrl={profileUrl}  
          />
        </Dropdown>

      </NavbarSection>

    </Navbar>
  );
}