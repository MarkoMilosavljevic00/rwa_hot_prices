import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/models/dtos/auth-credentials.dto';
import { UserDto } from 'src/models/dtos/users.dto';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async createUser(userDto: UserDto): Promise<void> {
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);
  }
}
