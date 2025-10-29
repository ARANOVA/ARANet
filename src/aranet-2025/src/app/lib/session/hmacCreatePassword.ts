
// TODO: Más seguro
export const hmacCreatePasswordOld = async (
  password: string,
  salt: string,
  algorithm: string = 'sha1',
): Promise<string> => {
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

export const createSalt = (): string => {
  return Buffer.from(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      (globalThis.crypto || require("crypto").webcrypto).getRandomValues(
        new Uint8Array(16)
      )
    ).toString("hex");
}

/**
 * Deriva una contraseña con PBKDF2 (funciona en navegador y Node >=19)
 */
export async function hmacCreatePassword(
  password: string,
  salt: string,
  algorithm: "SHA-256" | "SHA-512" = "SHA-512",
  iterations = 100_000,
  keyLen = 64, // en bytes
): Promise<string> {
  // Aseguramos compatibilidad Node < 19
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const subtle = (globalThis.crypto || require("crypto").webcrypto).subtle;

  const encoder = new TextEncoder();
  const pwKey = await subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations,
      hash: algorithm,
    },
    pwKey,
    keyLen * 8
  );

  const hashHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
