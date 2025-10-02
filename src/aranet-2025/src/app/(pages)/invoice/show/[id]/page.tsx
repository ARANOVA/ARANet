import { MenuItem, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader, DeleteModelButton, RestoreModelButton, ToastStoreAlert, InvoiceInfo, InvoiceItems, SendInvoiceButton } from "@/app/components";
import { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";
import { isValidId } from "@/utils";
import { aranet_invoice_verifactu } from "@/interfaces";
import { getModelState } from "@/utils";
import { de } from "zod/v4/locales";

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

export default async function InvoiceShowPage({ params }: Props) {
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

  const title = `${invoice.data?.invoice_prefix}${invoice.data?.invoice_number}_${invoice.data.client?.client_unique_name}`;
  const prefix = (invoice.data.kind_of_invoice) ? `${invoice.data.kind_of_invoice?.kind_of_invoice_title} `: '';

  const data: aranet_invoice_verifactu = {
    ...invoice.data,
    huellaPrev: null,
    invoicePrev: null,
  };
  
  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Finanzas', href: null },
    { name: 'Facturas', href: '/invoice/list' },
    { name: title, href: '' },
  ];
  
  const state = getModelState(invoice.data);

  let printButton: React.ReactNode | null = null;
  let mainButton: React.ReactNode | null = null;

  switch (state?.value) {
    case 'deleted':
      printButton = null;
      mainButton = <RestoreModelButton model="invoice" id={Number(id)} />;
      break;
    case 'sent':
      printButton = null;
      mainButton = null;
      break;
    default:
      printButton = <SendInvoiceButton data={data} key="send-invoice-button" />;
      mainButton = <DeleteModelButton model="invoice" id={Number(id)} />;
  }

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title={`${prefix}${title}`}
          subtitle="Vista de detalle del documento"
          model="invoice"
          state={state}
          data={data}
          edit_button_href={`/invoice/edit/${id}`}
          edit_button_text="Editar"
          print_button={printButton}
          main_button={mainButton}
        />
        <ToastStoreAlert />
        {/* Esto no funciona bien */}
        <InvoiceInfo
          invoice={invoice.data}
          addresses={addresses?.data?.items || []}
          contacts={contacts?.data?.items || []}
        />
        <InvoiceItems
          className="mt-4"
          invoice={invoice.data}
        />
      </div>
    </>
  )

}