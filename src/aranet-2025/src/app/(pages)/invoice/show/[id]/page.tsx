import { MenuItem, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader, DeleteModelButton, RestoreModelButton, ToastStoreAlert, InvoiceInfo } from "@/app/components";
import { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";
import { isValidId } from "@/utils";
import { datePipe } from "@/app/lib/helpers";

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
  const addresses = await dataPlain.useAddressesByObjectAndObjectId('client', parseInt(id, 10));
  const contacts = await dataPlain.useContactsByObjectAndObjectId('invoice', parseInt(id, 10));

  const title = `${invoice.data?.invoice_prefix}${invoice.data?.invoice_number}`;
  let aux = '';
  if (invoice?.data.deleted_at) {
    aux = ` (borrado ${datePipe(invoice?.data.deleted_at)})`;
  }
  
  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Finanzas', href: null },
    { name: 'Facturas', href: '/invoice/list' },
    { name: title + aux, href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title={`${title}_${invoice.data?.aranet_client?.client_unique_name}${aux}`}
          subtitle="Vista de detalle de factura"
          model="invoice"
          edit_button_href={`/invoice/edit/${id}`}
          edit_button_text="Editar"
          print_button_text={invoice.data.deleted_at ? undefined : 'Imprimir'}
          main_button={!invoice.data.deleted_at ?
            (<DeleteModelButton model="invoice" id={Number(id)} />) :
            (<RestoreModelButton model="invoice" id={Number(id)} />)
          }
        />
        <ToastStoreAlert />
        <InvoiceInfo
          invoice={invoice.data}
          addresses={addresses?.data?.items || []}
          contacts={contacts?.data?.items || []}
        />
      </div>
    </>
  )

}