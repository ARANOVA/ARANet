import { MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader } from "@/app/components";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ingresos - Finanzas',
};

export default async function IncomeListPage() {
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
    { name: 'Finanzas', href: null },
    { name: 'Ingresos', href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Ingresos"
          subtitle="Listado de ingresos"
          model="income"
          add_button_text="Añadir ingreso"
          search_placeholder="Buscar ingresos..."
        />
      </div>
    </>
  )

}