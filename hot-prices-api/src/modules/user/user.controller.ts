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
import { UpdateUserDto } from 'src/models/dtos/update-user.dto';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

// @UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get('getUserActivity/:id')
  getUserActivity(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserActivity(id);
  }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Patch('updateProfilePicture/:id')
  updateProfilePicture(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfilePicture(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Patch('updateUsername/:id')
  updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ) {
    // console.log(req.user);
    return this.userService.updateUsername(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Patch('updatePassword/:id')
  updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updatePassword(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
