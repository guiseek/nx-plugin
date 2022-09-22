import { pbkdf2Sync } from 'crypto';

export function encodePassword(
  plain: string,
  salt: string,
  iterations = 2000,
  keylen = 64,
  digest = 'sha512'
) {
  return pbkdf2Sync(plain, salt, iterations, keylen, digest);
}
