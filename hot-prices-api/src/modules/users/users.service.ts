import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/models/dtos/auth-credentials.dto';
import { UserDto as string, UserDto } from 'src/models/dtos/users.dto';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async createUser(userDto: UserDto): Promise<void> {
    const {username, password} = userDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({username, password: hashedPassword});
    try{
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if(error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException('Unexpected error');
      }
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }
}
