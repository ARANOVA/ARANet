'use client';
import { StackedLayout } from '..';
import { Menu, MenuItem } from '../../interfaces';
import { ShellNavbar, ShellSidebar } from './shell';

interface Props {
  logo: {
    light: string;
    dark: string;
  };
  title: string;
  subtitle?: string;
  navigation: Menu[];
  actions: Menu[];
  username: string;
  profileUrl?: string;
  email: string;
  avatar?: string;
  deleteSessionFn: () => void;
  children: React.ReactNode;
}

export function StackedAplicationLayout({
  navigation,
  actions,
  children,
  ...props
}: Props) {

  return (
    <StackedLayout
      navbar={<ShellNavbar {...props} navigation={navigation} actions={actions} />}
      sidebar={<ShellSidebar navigation={navigation} {...props} actions={actions} />}
    >
      {children}
    </StackedLayout>
  )
}