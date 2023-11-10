import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/models/dtos/auth-credentials.dto';
import { UserDto } from 'src/models/dtos/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userDto: UserDto): Promise<void> {
    return this.authService.signUp(userDto);
  }
}
