import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private logger = new Logger(AuthService.name);

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
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
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const alreadyExist = await this.userService.findByEmail(createUserDto.email);
    if (alreadyExist){
      throw new BadRequestException('User already exists');
    }
    return this.userService.create(createUserDto)
  }
}
