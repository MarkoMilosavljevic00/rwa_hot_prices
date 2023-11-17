import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return 'users';
  }

  @Get('/test')
  test() {
    return 'test';
  }
}
