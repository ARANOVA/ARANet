import { MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { EditableStoreTable, PageStoreHeader, PaginationStore, ToastStoreAlert } from "@/app/components";
import { Metadata } from "next";
import { incomeFilters, incomeColumns } from "@/app/data/income";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ingresos - Finanzas',
};

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: number;
    sortField?: string;
    sortDir?: string;
    filter?: string;
    'search[]'?: string[] | string;
  }>;
}

export default async function IncomeListPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session) {
    return <NotAuthorized />;
  }

  const dataPlain = ServerDataPlain.getInstance();
  const me = await dataPlain.useMe(session.id);
  if (!me.data?.id) {
    return <NotAuthorized />;
  }
  
  const { page, limit, sortField, sortDir } = await searchParams;
  const currentPage =
    page === undefined || isNaN(+page) || +page < 1 ? 1 : +page;
  const currentLimit =
    limit === undefined || isNaN(+limit) || +limit < 10 ? 10 : (+limit > 200 ? 200 : +limit);

  const typedSortDir: 'asc' | 'desc' = ({ desc: 'desc', asc: 'asc' }[
    (sortDir || 'asc').toLowerCase()
  ] || 'desc') as 'asc' | 'desc';

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
        <ToastStoreAlert />
        <EditableStoreTable<any>
          limit={currentLimit}
          page={currentPage - 1}
          pageDataSelection={<PaginationStore />}
          editTitle="Editar ingreso"
          newTitle="Añadir ingreso"
          viewTitle="Ver ingreso"
          subtitle="Por favor, completa todos los campos obligatorios"
          model="income"
          editModel="page"
          showModel="page"
          columns={incomeColumns}
          filters={incomeFilters}
          idField="id"
          sortField={sortField || 'income_date'}
          sortDir={typedSortDir}
        >
          <span>Hola</span>
        </EditableStoreTable>
      </div>
    </>
  )

}