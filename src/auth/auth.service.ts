import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {

  private logger = new Logger(AuthService.name);

  constructor(
    private userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const loggingUser = await this.userService.findByEmail(email);
    if (loggingUser && bcrypt.compare(password, loggingUser.password)){
      const {password, ...result} = loggingUser;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');    
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id }; 
    return {
      access_token: "",
    };
  }

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
