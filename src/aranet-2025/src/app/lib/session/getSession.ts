import { SessionPayload } from "@/interfaces";
import { cookies } from "next/headers";
import { decrypt } from "./session";

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session) return null;

  try {
    return await decrypt(session.value);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return null;
  }
}