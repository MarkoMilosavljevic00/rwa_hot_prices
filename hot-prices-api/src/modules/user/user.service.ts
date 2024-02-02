import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from 'src/modules/auth/dtos/login-auth.dto';
import {
  SignupAuthDto as string,
  SignupAuthDto,
} from 'src/modules/auth/dtos/signup-auth.dto';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserActivityDto } from 'src/modules/user/dtos/activity-user-dto';
import { PostService } from '../post/post.service';
import { UpdateUserDto } from 'src/modules/user/dtos/update-user.dto';
import { FileService } from '../file/file.service';
import { ImageType } from 'src/common/enums/image-type.enum';
import { AuthService } from '../auth/auth.service';
import { Post } from 'src/models/entities/post.entity';
import { Reaction } from 'src/models/entities/reaction.entity';
import { Comment } from 'src/models/entities/comment.entity';
import { ReactionService } from '../reaction/reaction.service';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private fileService: FileService,
  ) {}

  async createUser(userSignupDto: SignupAuthDto): Promise<User> {
    const { email, username, password, profilePicture } = userSignupDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      profilePicture,
    });
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username or Email already exists');
      } else {
        throw new InternalServerErrorException('Unexpected error');
      }
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getUserWithActivity(
    id: number,
  ): Promise<{ user: User; activity: UserActivityDto }> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['posts', 'comments'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const activity: UserActivityDto = {
      numberOfPosts: 0,
      numberOfComments: 0,
      numberOfHotReactions: 0,
      numberOfColdReactions: 0,
      numberOfDegrees: 0,
    };

    if (user.posts) {
      const posts = user.posts;
      const { totalHotReactions, totalColdReactions } = posts.reduce(
        (acc, post) => {
          acc.totalHotReactions += post.numOfHotReactions;
          acc.totalColdReactions += post.numOfColdReactions;
          return acc;
        },
        { totalHotReactions: 0, totalColdReactions: 0 },
      );

      activity.numberOfPosts = posts.length;
      activity.numberOfHotReactions = totalHotReactions;
      activity.numberOfColdReactions = totalColdReactions;
      activity.numberOfDegrees = totalHotReactions - totalColdReactions;
      user.posts = undefined;
    }

    if (user.comments) {
      activity.numberOfComments = user.comments.length;
      user.comments = undefined;
    }

    return {
      user,
      activity,
    };
  }

  async getUserActivity(id: number): Promise<UserActivityDto> {
    return (await this.getUserWithActivity(id)).activity;
  }

  async updateProfilePicture(id: number, updateUserDto: UpdateUserDto) {
    const { profilePicture } = updateUserDto;

    if (!profilePicture) {
      throw new BadRequestException('Profile picture is required');
    }
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (
      user.profilePicture &&
      this.fileService.isExists(ImageType.PROFILE_PICTURE, user.profilePicture)
    ) {
      await this.fileService.deleteImage(
        ImageType.PROFILE_PICTURE,
        user.profilePicture,
      );
    }
    user.profilePicture = profilePicture;

    return await this.userRepository.save(user);
  }

  async updatePassword(id: number, updateUserDto: UpdateUserDto) {
    const { currentPassword, newPassword } = updateUserDto;
    if (!currentPassword || !newPassword) {
      throw new BadRequestException('Password is required');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!(await bcrypt.compare(currentPassword, user.password)))
      throw new UnauthorizedException('Incorrect password');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }

  async updateUsername(id: number, updateUserDto: UpdateUserDto) {
    const { username } = updateUserDto;
    if (!username) {
      throw new BadRequestException('Username is required');
    }

    const userWithSameUsername = await this.userRepository.findOne({
      where: { username: username },
    });
    if (userWithSameUsername) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.username = username;
    // await this.userRepository.update({ id }, { username });
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts', 'reactions', 'comments'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    if (
      user.profilePicture &&
      this.fileService.isExists(ImageType.PROFILE_PICTURE, user.profilePicture)
    ) {
      await this.fileService.deleteImage(
        ImageType.PROFILE_PICTURE,
        user.profilePicture,
      );
    }

    await this.postRepository.remove(user.posts);
    await this.reactionRepository.remove(user.reactions);
    await this.commentRepository.remove(user.comments);

    return await this.userRepository.remove(user);
  }
}
