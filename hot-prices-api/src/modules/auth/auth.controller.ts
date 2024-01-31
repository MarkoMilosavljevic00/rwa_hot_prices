import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuthDto } from 'src/modules/auth/dtos/login-auth.dto';
import { SignupAuthDto } from 'src/modules/auth/dtos/signup-auth.dto';
import { AuthService } from './auth.service';
import { User } from 'src/models/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Request() req): Promise<{ user: User, accessToken: string }> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/loginByToken')
  getUserFromToken(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  signUp(@Body() userSignupDto: SignupAuthDto): Promise<{ user: User; accessToken: string}> {
    return this.authService.signUp(userSignupDto);
  }

  // @Post('/signin')
  // signIn(@Body() userDto: AuthCredentialsDto): Promise<{ accessToken }> {
  //   return this.authService.signIn(userDto);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post('/test')
  test(@Req() req) {
    return req.user;
  }
}
