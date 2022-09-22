import { User } from '../interfaces/user.interface';

export class AuthRequestDto implements Omit<User, 'id' | 'salt'> {
  username: string;
  password: string;
}
