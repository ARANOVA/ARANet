import { Divider, MenuItem, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { PageStoreHeader, DeleteModelButton, RestoreModelButton, ToastStoreAlert } from "@/app/components";
import { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";
import { isValidId, joinWithSeparators } from "@/utils";
import { datePipe } from "@/app/lib/helpers";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Ver gasto - Gastos - Finanzas',
};

export default async function ExpenseShowPage({ params }: Props) {
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
  const expense = await dataPlain.useExpenseById(parseInt(id, 10));
  if (!expense?.data) {
    notFound();
  }
  const addresses =  await dataPlain.useAddressesByObjectAndObjectId('vendor', expense.data.expense_item_vendor_id);
  const contacts = await dataPlain.useContactsByObjectAndObjectId('vendor', expense.data.expense_item_vendor_id);

  let aux = '';
  if (expense?.data.deleted_at) {
    aux = ` (borrado ${datePipe(expense?.data.deleted_at)})`;
  }

  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Finanzas', href: null },
    { name: 'Gastos', href: '/expense/list' },
    { name: expense.data?.expense_item_name + aux, href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title={`${datePipe(expense.data.expense_purchase_date)}: ${expense.data?.expense_item_name}${aux}`}
          subtitle={expense.data?.vendor?.vendor_unique_name}
          model="expense"
          edit_button_href={`/expense/edit/${id}`}
          edit_button_text="Editar"
          print_button_text={expense.data.deleted_at ? undefined : 'Alta Verifactu'}
          main_button={!expense.data.deleted_at ?
            (<DeleteModelButton model="expense" id={Number(id)} />) :
            (<RestoreModelButton model="expense" id={Number(id)} />)
          }
        />
        <ToastStoreAlert />
        {/* <ExpenseInfo
          expense={expense.data}
          addresses={addresses?.data?.items || []}
          contacts={contacts?.data?.items || []}
        /> */}
        <Divider />
      </div>
    </>
  )

}