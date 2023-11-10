import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/models/dtos/users.dto';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(userDto: UserDto): Promise<void> {
    await this.userService.createUser(userDto);
  }
}
