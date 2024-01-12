import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/models/dtos/auth-credentials.dto';
import { UserSignupDto as string, UserSignupDto } from 'src/models/dtos/user-signup.dto';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userSignupDto: UserSignupDto): Promise<void> {
    const { email, username, password } = userSignupDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      imgPath:
        'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg',
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException('Unexpected error');
      }
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({where: {id: id}});
  }
}
