import { MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { EditableStoreTable, PageStoreHeader, PaginationStore, ToastStoreAlert } from "@/app/components";
import { Metadata } from "next";
import { contactColumns, contactFilters } from "@/app/data/contact";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contactos - Empresas',
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

export default async function ContactsListPage({ searchParams }: Props) {
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
    { name: 'Empresas', href: null },
    { name: 'Contactos', href: '' },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Contactos"
          subtitle="Listado de contactos"
          model="invoice"
          add_button_text="Añadir contacto"
          search_placeholder="Buscar contactos..."
        />
        <ToastStoreAlert />
        <EditableStoreTable<any>
          limit={currentLimit}
          page={currentPage - 1}
          pageDataSelection={<PaginationStore />}
          editTitle="Editar contacto"
          newTitle="Añadir contacto"
          viewTitle="Ver contacto"
          subtitle="Por favor, completa todos los campos obligatorios"
          model="contact"
          editModel="page"
          showModel="page"
          columns={contactColumns}
          filters={contactFilters}
          idField="id"
          sortField={sortField || 'contact_first_name'}
          sortDir={typedSortDir}
        >
          <span>Hola</span>
        </EditableStoreTable>
      </div>
    </>
  )

}