import { MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { EditableStoreTable, PageStoreHeader, PaginationStore, ToastStoreAlert } from "@/app/components";
import { Metadata } from "next";
import { budgetColumns, budgetFilters } from "@/app/data/budget";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Presupuestos - Proyectos',
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

export default async function BudgetListPage({ searchParams }: Props) {
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
    (sortDir || 'desc').toLowerCase()
  ] || 'desc') as 'asc' | 'desc';

  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Proyectos', href: null },
    { name: 'Presupuestos', href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Presupuestos"
          subtitle="Listado de presupuestos"
          model="budget"
          add_button_text="Añadir presupuesto"
          search_placeholder="Buscar presupuestos..."
        />
        <ToastStoreAlert />
        <EditableStoreTable<any>
          limit={currentLimit}
          page={currentPage - 1}
          pageDataSelection={<PaginationStore />}
          editTitle="Editar presupuesto"
          newTitle="Añadir presupuesto"
          viewTitle="Ver presupuesto"
          subtitle="Por favor, completa todos los campos obligatorios"
          model="budget"
          editModel="page"
          showModel="page"
          columns={budgetColumns}
          filters={budgetFilters}
          idField="id"
          sortField={sortField || 'created_at'}
          sortDir={typedSortDir}
        >
          {/* <NewCalendarForm rrhh={rrhh.data} me={me.data} /> */}
          {/* <ListFormCalendar rrhh={rrhh.data} me={me.data}/> */}
          <span>Hola</span>
        </EditableStoreTable>
      </div>
    </>
  )

}