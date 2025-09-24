import { MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { EditableStoreTable, PageStoreHeader, PaginationStore, ToastStoreAlert } from "@/app/components";
import { Metadata } from "next";
import { clientColumns, clientFilters } from "@/app/data/client";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Clientes - Empresas',
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

export default async function ClientListPage({ searchParams }: Props) {
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

  const typedSortDir: 'asc' | 'desc' = ({ desc: 'desc', asc: 'asc' }[
    (sortDir || 'asc').toLowerCase()
  ] || 'desc') as 'asc' | 'desc';
  
  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Empresas', href: null },
    { name: 'Clientes', href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Clientes"
          subtitle="Listado de clientes"
          model="client"
          add_button_text="Añadir cliente"
          search_placeholder="Buscar clientes..."
        />
        <ToastStoreAlert />
        <EditableStoreTable<any>
          limit={limit}
          page={currentPage - 1}
          pageDataSelection={<PaginationStore />}
          editTitle="Editar cliente"
          newTitle="Añadir cliente"
          viewTitle="Ver cliente"
          subtitle="Por favor, completa todos los campos obligatorios"
          model="client"
          editModel="page"
          showModel="page"
          columns={clientColumns}
          filters={clientFilters}
          idField="id"
          sortField={sortField || 'client_company_name'}
          sortDir={typedSortDir}
        >
          <span>Hola</span>
        </EditableStoreTable>
      </div>
    </>
  )

}