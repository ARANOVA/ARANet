import { MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader } from "@/app/components";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Facturas - Finanzas',
};

export default async function AdminUserListPage() {
  const session = await getSession();
  if (!session) {
    return <NotAuthorized />;
  }

  const dataPlain = ServerDataPlain.getInstance();
  const me = await dataPlain.useMe(session.id);
  if (!me.data?.id) {
    return <NotAuthorized />;
  }
  
  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Administración', href: null },
    { name: 'Usuarios', href: '/admin/user/list' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Usuarios"
          subtitle="Listado de usuarios"
          model="invoice"
          add_button_text="Añadir usuario"
          search_placeholder="Buscar usuarios..."
        />
      </div>
    </>
  )

}