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
  const me = await dataPlain.useMe(session.id);
  if (!me.data?.id) {
    return <NotAuthorized />;
  }

  const navItems: NavbarMenuItem[] = [
    {
      header: 'Dashboard',
      items: [
        { name: 'Informe anual', href: '/', icon: <UsersIcon />, children: []},
      ],
    },

  ];

  if (isRole('member', me.data) && navItems[0].items[0].children) {
    navItems[0].items[0].children.push(...[
      { name: 'Ingresos', href: '/dashboard/incomes', icon: <UsersIcon /> },
      { name: 'Gastos', href: '/dashboard/expenses', icon: <UsersIcon /> },
      { name: 'Presupuestos', href: '/dashboard/budgets', icon: <UsersIcon /> },
      { name: 'Social', href: '/dashboard/social', icon: <UsersIcon /> },
    ]);
  }

  if (isRole('crm', me.data)) {
    navItems.push({
      header: 'Empresas',
      items: [
        { name: 'Clientes', href: '/client/list', icon: <UsersIcon />, children: [
          { name: 'Proveedores', href: '/vendor/list', icon: <UsersIcon /> },
          { name: 'Contactos', href: '/contact/list', icon: <UsersIcon /> },
        ]},
      ],
    })
  }

  // Project manager
  if (isRole('pm', me.data)) {
    navItems.push({
      header: 'Proyectos',
      items: [
        { name: 'Proyectos', href: '/project/list', icon: <UsersIcon />, children: [
          { name: 'Presupuestos', href: '/budget/list', icon: <UsersIcon /> },
          { name: 'Partes de dedicación', href: '/timesheet/list', icon: <UsersIcon /> },
        ]},
      ],
    });
  }

  if (isRole('financial', me.data)) {
    navItems.push({
      header: 'Finanzas',
      items: [
        { name: 'Facturas', href: '/invoice/list', icon: <CalendarIcon />, children: [
          { name: 'Gastos', href: '/expense/list', icon: <UsersIcon /> },
          { name: 'Ingresos', href: '/income/list', icon: <UsersIcon /> },
          { name: 'Movimientos de caja', href: '/cash/list', icon: <UsersIcon /> },
        ]},
      ],
    });
    navItems.push({
      header: 'Fiscal',
      items: [
        { name: 'Modelo 347', href: '/legal/347', icon: <UsersIcon />, children: [
          { name: 'Comprobar verifactu', href: '/legal/verifactu',  icon: <UsersIcon /> },
      ]},
      ],
    });

  if (hasAdminRights(me.data)) {
    navItems.push({
      header: 'Administración',
      items: [
        { name: 'Usuarios', href: '/admin/user/list', icon: <UsersIcon />, children: []},
      ]
    });
  }

  const userItems: NavbarMenuItem = {
    header: 'Acciones de usuario',
    items: [
      {
        name: 'Notificaciones',
        href: '/notificaciones',
        component: <NotificationMenuIcon key="notificaciones" nbMessages={0} />,
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
        navigation={navItems}
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
