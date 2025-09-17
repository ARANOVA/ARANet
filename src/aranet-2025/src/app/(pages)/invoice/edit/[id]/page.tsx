import { MenuItem, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader, DeleteModelButton, ToastStoreAlert } from "@/app/components";
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
    const invoice = await dataPlain.useInvoiceById(parseInt(id, 10));
    if (!invoice?.data) return {};

    return {
      title: `${invoice.data?.invoice_prefix}${invoice.data.invoice_number} - Facturas - Empresas`,
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
  const invoice = await dataPlain.useInvoiceById(parseInt(id, 10));
    if (!invoice?.data) {
    notFound();
  }
  
  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Finanzas', href: null },
    { name: 'Facturas', href: '/invoice/list' },
    { name: `${invoice.data?.invoice_prefix}${invoice.data?.invoice_number}`, href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title={`${invoice.data?.invoice_prefix}${invoice.data?.invoice_number} (${invoice.data?.aranet_client?.client_unique_name})`}
          subtitle="Editar factura"
          model="invoice"
          main_button={<DeleteModelButton model="invoice" id={invoice.data?.id} />}
        />
        <ToastStoreAlert />
      </div>
    </>
  )

}