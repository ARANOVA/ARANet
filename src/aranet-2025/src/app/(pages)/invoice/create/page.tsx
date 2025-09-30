import { MenuItem, TopBreadcrumb } from "@aranova/aranova-react-ui";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader } from "@/app/components";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Nueva - Facturas - Finanzas',
};

export default async function ClientCreatePage() {
  const cookie = await getSession();
  if (!cookie) {
    unauthorized();
  }

  
  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Finanzas', href: null },
    { name: 'Facturas', href: '/invoice/list' },
    { name: 'Nueva', href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Añadir factura"
          model="invoice"
        />
      </div>
    </>
  )

}