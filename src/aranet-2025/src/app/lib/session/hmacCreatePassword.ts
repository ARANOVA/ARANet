// import crypto from 'crypto';

// export function hmacCreatePassword(password: string, salt: string, algorithm: string = 'sha1'): string {
//   return crypto.createHmac(algorithm, salt).update(password).digest('hex');
// }

export const hmacCreatePassword = async (password: string, salt: string, algorithm: string = 'sha1'): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  if (algorithm === 'sha1') {
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } else {
    return 'undefined';
  }
}
