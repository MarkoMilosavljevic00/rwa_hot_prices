import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/modules/user/dtos/update-user.dto';
import { UserGuard } from '../auth/guards/user.guard';

// @UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUserWithActivity/:id')
  getUserWithActivity(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserWithActivity(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUserActivity/:id')
  getUserActivity(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserActivity(id);
  }

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Patch('updateProfilePicture/:id')
  updateProfilePicture(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfilePicture(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Patch('updateUsername/:id')
  updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ) {
    // console.log(req.user);
    return this.userService.updateUsername(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Patch('updatePassword/:id')
  updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updatePassword(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
