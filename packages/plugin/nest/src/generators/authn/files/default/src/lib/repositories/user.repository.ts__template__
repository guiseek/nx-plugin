import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  private readonly users: User[] = [];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createOne(user: Omit<User, 'id'>): Promise<User | undefined> {
    const id = this.users.length + 1;
    const idx = this.users.push({ ...user, id });
    return this.users[idx - 1];
  }
}
