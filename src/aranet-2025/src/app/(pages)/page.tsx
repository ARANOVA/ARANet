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
  const currentYear = new Date().getFullYear();
  const options = Array.from({ length: 3 }, (_, i) => {
    const year = currentYear - (2 - i); // genera [currentYear-2, currentYear-1, currentYear]
    return {
      label: String(year),
      value: year,
      selected: year === currentYear,
    };
  });

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