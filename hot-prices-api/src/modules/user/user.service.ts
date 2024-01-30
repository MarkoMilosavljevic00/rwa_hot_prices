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
import { LoginAuthDto } from 'src/models/dtos/login-auth.dto';
import {
  UserSignupDto as string,
  UserSignupDto,
} from 'src/models/dtos/signup-auth.dto';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserActivityDto } from 'src/models/dtos/activity-user-dto';
import { PostService } from '../post/post.service';
import { UpdateUserDto } from 'src/models/dtos/update-user.dto';
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
    // @InjectRepository(Post) private postRepository: Repository<Post>,
    // @InjectRepository(Reaction) private reactionRepository: Repository<Reaction>,
    // @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private postService: PostService,
    // private reactionService: ReactionService,
    // @Inject(forwardRef(() => CommentService))private commentService: CommentService,
    private fileService: FileService,
  ) {}

  async createUser(userSignupDto: UserSignupDto): Promise<User> {
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

  async getUserActivity(id: number): Promise<UserActivityDto> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['posts', 'comments'],
    });
    const posts = user.posts;
    const comments = user.comments;
    const { totalHotReactions, totalColdReactions } = posts.reduce(
      (acc, post) => {
        acc.totalHotReactions += post.numOfHotReactions;
        acc.totalColdReactions += post.numOfColdReactions;
        return acc;
      },
      { totalHotReactions: 0, totalColdReactions: 0 },
    );

    return {
      numberOfPosts: posts.length,
      numberOfComments: comments.length,
      numberOfHotReactions: totalHotReactions,
      numberOfColdReactions: totalColdReactions,
      numberOfDegrees: totalHotReactions - totalColdReactions,
    };
  }

  async updateProfilePicture(id: number, updateUserDto: UpdateUserDto) {
    const { profilePicture } = updateUserDto;
    console.log(profilePicture);

    if (!profilePicture) {
      throw new BadRequestException('Profile picture is required');
    }
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (
      user.profilePicture &&
      this.fileService.isExists(ImageType.UserImage, user.profilePicture)
    ) {
      await this.fileService.deleteImage(
        ImageType.UserImage,
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
      // relations: ['posts', 'reactions', 'comments'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // Obrisi sve postove, reakcije i komentare
    // await this.postRepository.remove(user.posts);
    // await this.reactionRepository.remove(user.reactions);
    // await this.commentRepository.remove(user.comments);

    // Obrisi korisnika
    await this.userRepository.remove(user);
  }
}
