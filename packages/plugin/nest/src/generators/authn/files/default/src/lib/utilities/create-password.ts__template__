import { randomBytes } from 'crypto';
import { encodePassword } from './encode-password';

export function createPassword(plain: string) {
  const salt = randomBytes(16).toString('hex');
  const pass = encodePassword(plain, salt);
  return { salt, password: pass.toString('hex') };
}
