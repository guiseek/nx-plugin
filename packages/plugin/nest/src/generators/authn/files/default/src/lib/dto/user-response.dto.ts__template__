import { Exclude } from 'class-transformer';
import { User } from '../interfaces/user.interface';

export class UserResponseDto implements User {
  id: number;
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  salt: number;

  constructor(value: Partial<UserResponseDto>) {
    Object.assign(this, value);
  }
}
