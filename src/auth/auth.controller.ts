import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {

  constructor (
    private authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  async login(@Body() body: { email: string, password: string}) {
    return this.authService.validateUser(body.email, body.password)
      .then((user) => {
        return this.authService.login(user);
      })
  }

  @Post('protected')
  async protected(@Request() req) {
    return { message: `This is a protected route`, user: req.user}
  }

}
