import '../globals.css';
import {
  CalendarIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import { dehydrate } from '@tanstack/react-query';
import {
  NavbarMenuItem,
  StackedAplicationLayout,
  NotAuthorized,
  NotificationMenuIcon,
} from '@aranova/aranova-react-ui';
import { deleteSession, getSession } from '@/app/lib/session';
import { hasAdminRights, isRole } from '@/app/lib/helpers';
import ServerDataPlain from '@/app/data/ServerDataPlain';
import ServerQueryProvider from '@/app/ServerQueryProvider';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    return <NotAuthorized />;
  }
  
  const dataPlain = ServerDataPlain.getInstance();
  const queryClient = dataPlain.getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  const me = await dataPlain.useMe(session.userId as number);
  if (!me.data?.id) {
    return <NotAuthorized />;
  }

  const navItems: NavbarMenuItem = {
    header: 'Administración',
    items: [],
  };

  if (hasAdminRights(me.data)) {
    navItems.items.push(
      { name: 'Menu1', href: '/admin/menu1', icon: <UsersIcon /> },
    );
  } else if (isRole('financial', me.data)) {
    navItems.items.push(
      {
        name: 'Facturas',
        href: '/admin/facturas',
        icon: <CalendarIcon />,
      }
    );
  }

  const userItems: NavbarMenuItem = {
    header: 'Acciones de usuario',
    items: [
      {
        name: 'Notificaciones',
        href: '/notificaciones',
        component: <NotificationMenuIcon nbMessages={0} />,
      },
    ],
  };

  return (
    <ServerQueryProvider dehydratedState={dehydratedState}>
      <StackedAplicationLayout
        logo={{
          light: process.env.APP_LOGO_LIGHT || '',
          dark: process.env.APP_LOGO_DARK || '',
        }}
        title={process.env.APP_TITLE || 'ARANet'}
        subtitle={process.env.APP_CLIENT || 'ARANOVA'}
        navigation={[navItems]}
        actions={[userItems]}
        username={me.data?.username || ''}
        profileUrl="/profile"
        email={me.data?.email || ''}
        avatar={'/images/no-avatar.jpg'}
        deleteSessionFn={deleteSession}
      >
        {children}
      </StackedAplicationLayout>
    </ServerQueryProvider>
  );
}
