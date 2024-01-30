import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupAuthDto } from 'src/models/dtos/signup-auth.dto';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from 'src/models/dtos/login-auth.dto';
import { User } from 'src/models/entities/user.entity';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    } else if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Incorrect password');
    return user;
  }

  async signUp(
    userDto: SignupAuthDto,
  ): Promise<{ user: User; accessToken: string }> {
    const user = await this.userService.createUser(userDto);
    return await this.login(user);
  }

  async login(user: User): Promise<{ user: User; accessToken: string }> {
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    const accessToken: string = await this.jwtService.sign(payload);
    return { user, accessToken };
  }
}
