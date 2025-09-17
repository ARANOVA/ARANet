import { MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader } from "@/app/components";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gastos - Dashboard',
};

export default async function DashboardExpensesPage() {
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
    { name: 'Dashboard', href: null },
    { name: 'Gastos', href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Dashboard"
          subtitle="Gastos"
          model="expense"
        />
      </div>
    </>
  )

}