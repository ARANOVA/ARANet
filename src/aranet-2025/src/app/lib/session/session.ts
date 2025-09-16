import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/src/interfaces';

const secretKeStr = (process.env.SESSION_SECRET || 'supersecret') as string;
const secretKey = new TextEncoder().encode(secretKeStr);

export async function encrypt(payload: SessionPayload): Promise<string> {
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt();
    
  if (payload.exp) {
    jwt.setExpirationTime(payload.exp);
  }

  return jwt.sign(secretKey);
}

export async function decrypt(session: string | undefined): Promise<SessionPayload | null> {
  if (!session) return null; // Si no hay token, retorna null

  try {
    const { payload } = await jwtVerify(session, secretKey, { algorithms: ['HS256'] });
    return payload as SessionPayload; // Retorna el contenido del JWT decodificado
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return null; // En caso de error (token inválido o expirado), retorna null
  }
}