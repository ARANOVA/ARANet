'use client'

import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "../tw";

interface Props {
  anchor: 'top start' | 'bottom end';
  username: string;
  profileUrl?: string;
  deleteSessionFn: () => void;
};

export function AccountDropdownMenu({ anchor, username, profileUrl, deleteSessionFn }: Props) {

  return (
    <DropdownMenu className="max-w-64 min-w-48" anchor={ anchor }>
      <DropdownItem disabled={!profileUrl} href={profileUrl}>
        <UserCircleIcon />
        <DropdownLabel className="font-bold">{username}</DropdownLabel >
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={() => deleteSessionFn()} >
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Cerrar sesión</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}