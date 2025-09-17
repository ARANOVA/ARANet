import crypto from 'crypto';

export function hmacCreatePassword(password: string, salt: string, algorithm: string = 'sha1') {
  return crypto.createHmac(algorithm, salt).update(password).digest('hex');
}
