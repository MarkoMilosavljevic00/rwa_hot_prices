import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/models/entities/comment.entity';
import { Repository } from 'typeorm';
import { PostCommentDto } from './dtos/post-comment.dto';
import { Post } from 'src/models/entities/post.entity';
import { UsersService } from '../users/users.service';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private postService: PostService,
    private usersService: UsersService,
  ) {}

  async getCommentsByPostId(
    postId: number,
    numOfComments?: number,
  ): Promise<Comment[]> {
    const query = this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.owner', 'user')
      .where('comment.postId = :postId', { postId })
      .andWhere('comment.restricted = false')
      .orderBy('comment.postedDate', 'ASC');

    if (numOfComments) {
      query.take(numOfComments);
    }

    return await query.getMany();
  }

  async postComment(postCommentDto: PostCommentDto) {
    const { postId, userId } = postCommentDto;

    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new InternalServerErrorException(
        `Failed to create the comment: Post with id ${postId} does not exist`,
      );
    }

    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new InternalServerErrorException(
        `Failed to create the comment: User with id ${userId} does not exist`,
      );
    }

    const comment = this.commentRepository.create({
      ...postCommentDto,
      owner: user,
      post,
    });

    try {
      await this.commentRepository.save(comment);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create the comment: ${error}`,
      );
    }
    return comment;
  }

  async deleteComment(id: number) {
    try {
      return await this.commentRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete the comment: ${error}`,
      );
    }
  }
}
