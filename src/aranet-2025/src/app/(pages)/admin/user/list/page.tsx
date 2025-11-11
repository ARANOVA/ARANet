import {
  MenuItem,
  NotAuthorized,
  TopBreadcrumb,
} from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import {
  EditableStoreTable,
  PageStoreHeader,
  PaginationStore,
  ToastStoreAlert,
} from "@/app/components";
import { Metadata } from "next";
import { userColumns, userFilters } from "@/app/data/user";
import { ListFormGeneric } from "@/app/components/forms/ListFormGeneric";
import UserEditForm from "@/app/components/forms/user/EditUserForm";
import NewUserForm from "@/app/components/forms/user/NewUserForm";
import { useEntity } from "../../../../data/ClientDataPlain";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Usuarios - Administración",
};

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: number;
    sortField?: string;
    sortDir?: string;
    filter?: string;
    "search[]"?: string[] | string;
  }>;
}

export default async function AdminUserListPage({ searchParams }: Props) {
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
    limit === undefined || isNaN(+limit) || +limit < 10
      ? 10
      : +limit > 200
      ? 200
      : +limit;

  const typedSortDir: "asc" | "desc" = ({ desc: "desc", asc: "asc" }[
    (sortDir || "asc").toLowerCase()
  ] || "desc") as "asc" | "desc";

  const links: MenuItem[] = [
    { name: "Inicio", href: "/" },
    { name: "Administración", href: null },
    { name: "Usuarios", href: "/admin/user/list" },
  ];

  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Usuarios"
          subtitle="Listado de usuarios"
          model="user"
          add_button_text="Añadir usuario"
          search_placeholder="Buscar usuarios..."
        />
        <ToastStoreAlert />
        <EditableStoreTable<any>
          limit={currentLimit}
          page={currentPage - 1}
          pageDataSelection={<PaginationStore />}
          editTitle="Editar usuario"
          newTitle="Añadir usuario"
          viewTitle="Ver usuario"
          subtitle="Por favor, completa todos los campos obligatorios"
          model="user"
          editModel="modal"
          showModel="modal"
          columns={userColumns}
          filters={userFilters}
          idField="id"
          sortField={sortField || "id"}
          sortDir={typedSortDir}
        >
          <ListFormGeneric
            model="user"
            useGetHook={useEntity}
            EditForm={UserEditForm}
            NewForm={NewUserForm}
          />
          {/* <ListFormUser/> */}
        </EditableStoreTable>
      </div>
    </>
  );
}
