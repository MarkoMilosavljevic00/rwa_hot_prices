import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from 'src/models/dtos/auth-credentials.dto';
import { UserDto } from 'src/models/dtos/users.dto';
import { User } from 'src/models/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userDto: UserDto): Promise<void> {
    return this.authService.signUp(userDto);
  }

  @Post('/signin')
  signIn(@Body() userDto: UserDto): Promise<{ accessToken }> {
    return this.authService.signIn(userDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
