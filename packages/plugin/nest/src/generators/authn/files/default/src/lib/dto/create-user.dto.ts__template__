import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class CreateUserDto implements Omit<User, 'id' | 'salt'> {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
