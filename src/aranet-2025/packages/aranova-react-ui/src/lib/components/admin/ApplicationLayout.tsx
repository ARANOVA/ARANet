import { SidebarLayout } from '..';
import { Menu } from '../../interfaces';
import { ShellNavbar, ShellSidebar } from './shell';

interface Props {
  logo: {
    light: string;
    dark: string;
  };
  title: string;
  avatar:string;
  navigation: Menu[],
  username: string;
  email: string;
  deleteSessionFn: () => void;
  children: React.ReactNode
}

export function ApplicationLayout({
  navigation,
  children,
  ...props
}: Props) {

  return (
    <SidebarLayout
      navbar={<ShellNavbar {...props} />}
      sidebar={<ShellSidebar navigation={navigation} {...props} />}
    >
      {children}
    </SidebarLayout>
  )
}