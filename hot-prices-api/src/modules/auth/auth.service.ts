import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignupDto } from 'src/models/dtos/user-signup.dto';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from 'src/models/dtos/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserSignupDto): Promise<void> {
    await this.userService.createUser(userDto);
  }

  async signIn(authDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.userService.getUserByUsername(authDto.username);
    if(!user) {
      throw new NotFoundException('User with this username does not exist');
    } else if (!await bcrypt.compare(authDto.password, user.password)){
      throw new UnauthorizedException('Incorrect password');
    }
    else {
      const payload: JwtPayload = { username: user.username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    }
  }
}
