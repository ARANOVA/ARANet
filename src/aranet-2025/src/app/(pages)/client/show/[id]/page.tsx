import { MenuItem, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader } from "@/app/components";
import { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";
import { isValidId } from "@/utils";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (isValidId(id)) {
    const dataPlain = ServerDataPlain.getInstance();
    const client = await dataPlain.useClientById(parseInt(id, 10));
    if (!client?.data) return {};

    return {
      title: `${client.data?.client_company_name} - Clientes - Empresas`,
    };
  }
  return {};
}

export default async function ClientShowPage({ params }: Props) {
  const { id } = await params;
  if (!isValidId(id)) {
    notFound();
  }

  const cookie = await getSession();
  if (!cookie) {
    unauthorized();
  }

  // Comprobar permisos/roles (en el middleware)
  const dataPlain = ServerDataPlain.getInstance();
  const client = await dataPlain.useClientById(parseInt(id, 10));
  
  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Empresas', href: null },
    { name: 'Clientes', href: '/client/list' },
    { name: client.data?.client_company_name || id, href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title={client.data?.client_company_name || id}
          subtitle={`Vista de detalle de cliente (${client.data?.client_unique_name})`}
          model="client"
        />
      </div>
    </>
  )

}