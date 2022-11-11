import { Injectable, Inject, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async showAll():Promise<User[]> {
    return await this.usersRepository.find();
  }

  async createUser(user: User): Promise<User | string> {
    if (user) {
      await this.usersRepository.save(user);
      return this.usersRepository.create({
        id: user.id,
        fullName: user.fullName,
        birthday: user.birthday,
        isActive: user.isActive,
      });
    }
    return 'user not created';
  }
  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['fullName', 'birthday', 'isActive'],
      where: [{ id: _id }],
    });
  }

  async updateUser(id: number, user: User) {
    // @ts-ignore
    await this.usersRepository.save(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
