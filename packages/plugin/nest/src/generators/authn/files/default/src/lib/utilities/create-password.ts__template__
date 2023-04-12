import { hash } from 'bcrypt';

export const createPassword = async (plain: string, salt = 10) => {
  return { salt, password: await hash(plain, salt) };
};
