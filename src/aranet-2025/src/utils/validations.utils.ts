export function isValidDNIorNIF(dni: unknown): boolean {
  if (typeof dni !== 'string' || !dni) return false;
  let value = dni.trim();

  const dniRegex = /^(\d{8})([A-Z])$/i;
  const nifRegex = /^[XYZKLM]\d{7}[A-Z]$/i;

  value = value.toUpperCase();

  // DNI
  if (dniRegex.test(value)) {
    const [, numStr, letra] = value.match(dniRegex)!;
    const num = parseInt(numStr, 10);
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    return letras[num % 23] === letra;
  }

  // NIF (X, Y, Z, K, L, M como prefijo)
  if (nifRegex.test(value)) {
    const numStr = value.slice(0, -1).replace("X", "0").replace("Y", "1").replace("Z", "2");
    const letra = value.slice(-1);
    const num = parseInt(numStr.slice(1), 10); // quitar la primera letra
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    return letras[num % 23] === letra;
  }

  return false;

}

export const isValidUsername = (username: string): boolean => {
  // Solo letras y números, mínimo 1, máximo 127 caracteres
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(username) && username.length < 128;
}

export const isValidId = (id?: number | string): boolean => {
  const regex = /^(?:[1-9]\d{0,8}|1\d{9}|20\d{8}|21[0-3]\d{7}|214[0-6]\d{6}|2147[0-3]\d{5}|21474[0-7]\d{4}|214748[0-2]\d{3}|2147483[0-5]\d{2}|21474836[0-3]\d|214748364[0-7])$/;
  return id !== undefined && regex.test(id.toString()) && !isNaN(Number(id)) && Number(id) > 0;
}