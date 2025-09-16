import { NotAuthorized } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib";

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

  const helloTxt = me.data?.name ? `Hola, ${me.data.name}` : 'Hola,';

  return (
    <>
      <div className="flex flex-col flex-1">
        <p>{helloTxt}</p>
      </div>
    </>
  )

}