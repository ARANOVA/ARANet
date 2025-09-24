'use server';

import { decrypt, encrypt } from './session'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
 
export async function createSession(id: number, username: string, email: string, roles: string[], remember: boolean): Promise<void> {
  const expiresAt = (remember ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined)
  const session = await encrypt({ id, username, email, roles, expiresAt })
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}