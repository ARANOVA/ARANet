import { MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader } from "@/app/components";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Clientes - Empresas',
};

export default async function ClientListPage() {
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
    { name: 'Empresas', href: null },
    { name: 'Clientes', href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Clientes"
          subtitle="Listado de clientes"
          model="client"
          add_button_text="Añadir cliente"
          search_placeholder="Buscar clientes..."
        />
      </div>
    </>
  )

}