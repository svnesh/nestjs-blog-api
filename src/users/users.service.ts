import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({id})
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {password, ...others} = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { password: hashedPassword, ...others};
    const user = await this.usersRepository.save(newUser);
    return user;
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({email });
  }
}
