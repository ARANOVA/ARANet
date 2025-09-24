import { NotAuthorized } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { DropdownSelectButton, PageStoreHeader } from "@/app/components";

export default async function HomePage() {
  const session = await getSession();
  if (!session) {
    return <NotAuthorized />;
  }

  const dataPlain = ServerDataPlain.getInstance();
  const me = await dataPlain.useMe(session.id);
  if (!me.data?.id) {
    return <NotAuthorized />;
  }

  const helloTxt = me.data?.username ? `Hola ${me.data.username},` : 'Hola,';
  const options = [
    { label: '2023', value: 2023, selected: false },
    { label: '2024', value: 2024, selected: false },
    { label: '2025', value: 2025, selected: true }
  ]

  return (
    <>
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Dashboard"
          subtitle="Informe anual"
          model="calendarios"
          main_button={<DropdownSelectButton options={options}/>}
        />
        <p>{helloTxt}</p>
      </div>
    </>
  )

}