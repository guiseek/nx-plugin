import { encodePassword } from './encode-password';

export function validatePassword(plain: string, hash: string, salt: string) {
  const pass = encodePassword(plain, salt);
  return pass.compare(Buffer.from(hash));
}
