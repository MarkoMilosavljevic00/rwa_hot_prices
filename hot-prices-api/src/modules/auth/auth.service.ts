import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/models/dtos/users.dto';
import { JwtPayload } from 'src/models/interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto): Promise<void> {
    await this.userService.createUser(userDto);
  }

  async signIn(userDto: UserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.getUserByUsername(userDto.username);
    if(!user) {
      throw new NotFoundException('User with this username does not exist');
    } else if (!await bcrypt.compare(userDto.password, user.password)){
      throw new UnauthorizedException('Incorrect password');
    }
    else {
      const payload: JwtPayload = { username: user.username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    }
  }
}
