import { MenuItem, NotAuthorized, TopBreadcrumb, WhereInput } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader, DeleteModelButton, RestoreModelButton, ToastStoreAlert, InvoiceInfo, InvoiceItems, SendInvoiceButton } from "@/app/components";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidId } from "@/utils";
import { aranet_invoice_join_all, aranet_invoice_verifactu } from "@/interfaces";
import { getModelState } from "@/utils";
import { logError, logWarn } from "@/app/lib/logger";
import { aranet_invoice } from "@/generated/prisma";

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

  const session = await getSession();
  if (!session) {
    return <NotAuthorized />;
  }

  const dataPlain = ServerDataPlain.getInstance();
  const me = await dataPlain.useMe(session.id);
  if (!me.data?.id) {
    return <NotAuthorized />;
  }

  // Comprobar permisos/roles (en el middleware)
  const invoice = await dataPlain.useInvoiceById(parseInt(id, 10));
  if (!invoice?.data) {
    notFound();
  }
  const addresses = await dataPlain.useAddressesByObjectAndObjectId('client', parseInt(id, 10));
  const contacts = await dataPlain.useContactsByObjectAndObjectId('invoice', parseInt(id, 10));
  const defaultAddress = (addresses.data?.items || []).find(a => a.objectaddress_is_default);
  const defaultContact = (contacts.data?.items || []).find(c => c.objectcontact_is_default);

  const title = `${invoice.data?.invoice_prefix}${invoice.data?.invoice_number}_${invoice.data.client?.client_unique_name}`;
  const prefix = (invoice.data.kind_of_invoice) ? `${invoice.data.kind_of_invoice?.kind_of_invoice_title} `: '';

  const data: aranet_invoice_verifactu = {
    ...invoice.data,
    huellaPrev: null,
    invoicePrev: null,
  };

  // TODO: recuperar la anterior en la serie
  const prevFilter: WhereInput = {
    invoice_prefix: { equals: data.invoice_prefix || undefined},
    sent_at: { not: null },
  }
  const prevInvoices = await dataPlain.useInvoices(1, 1, 'sent_at', 'desc', [], prevFilter);
  console.log('Prev invoices:', prevInvoices?.data?.items);
  let prevInvoice: aranet_invoice_join_all | null = null;
  let showSendButton = true;
  if ((prevInvoices?.data?.items || []).length > 0) {
    // TODO: Comprobar si es correcto
    prevInvoice = prevInvoices?.data?.items[0] || null;
    const nPrev = prevInvoice?.invoice_number ? parseInt(prevInvoice?.invoice_number) : null;
    const nCurr = data.invoice_number ? parseInt(data.invoice_number) : null;
    if (!nPrev || isNaN(nPrev) || !nCurr || isNaN(nCurr) || nCurr - 1 !== nPrev) {
      logWarn('La factura previa no es la anterior en la serie');
      showSendButton = false;
      // return notFound();
    }
    if (!prevInvoice?.sent_hash) {
      logWarn('La factura previa no tiene huella');
      showSendButton = false;
      // return notFound();
    }
    data.invoicePrev = prevInvoice;
    data.huellaPrev = prevInvoice?.sent_hash || 'xxx';
  }
  
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
      printButton = showSendButton ? <SendInvoiceButton data={data} me={me.data} key="send-invoice-button" /> : null;
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