import React from 'react';

export interface MenuItem {
  name: string;
  label?: string;
  href: string | null;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  children?: MenuItem[];
  divider?: boolean;
}

export interface Menu {
  header: string;
  anchor?: 'top start' | 'bottom end';
  items: MenuItem[];
}

export interface NavbarMenuItem {
  header: string;
  items: MenuItem[]
}

export interface TabMenu {
  key: string;
  label: string;
  component?: React.ReactNode;
}