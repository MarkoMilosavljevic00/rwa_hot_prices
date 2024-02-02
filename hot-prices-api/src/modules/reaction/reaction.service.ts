import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from '../../models/entities/reaction.entity';
import { Repository } from 'typeorm';
import { ReactionDto } from './dtos/reaction.dto';
import { UserService } from '../user/user.service';
import { Post } from 'src/models/entities/post.entity';
import { PostService } from '../post/post.service';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  async getReaction(userId: number, postId: number) {
    try {
      return await this.reactionRepository
        .createQueryBuilder('reaction')
        .where('reaction.userId = :userId', { userId })
        .andWhere('reaction.postId = :postId', { postId })
        .getOne();
    } catch (error) {
      throw new BadRequestException(`Failed to get reaction: ${error.message}`);
    }
  }

  async getReactionAndNumbers(
    userId: number,
    postId: number,
  ): Promise<{
    reaction: Reaction;
    numOfHotReactions: number;
    numOfColdReactions: number;
    numOfDegrees: number;
  }> {
    const reactionsNumbers = await this.postService.getReactionsNumbers(postId);
    const reaction = await this.getReaction(userId, postId);

    return { reaction, ...reactionsNumbers };
  }

  async createOrUpdateReaction(userId: number, reactionDto: ReactionDto): Promise<{
    reaction: Reaction;
    numOfHotReactions: number;
    numOfColdReactions: number;
    numOfDegrees: number;
  }> {
    const { postId, type } = reactionDto;
    let isReactionExists: boolean = false;
    let reactionNumbers: {
      numOfHotReactions: number;
      numOfColdReactions: number;
      numOfDegrees: number;
    };

    let reaction = await this.getReaction(userId, postId);

    if (reaction) {
      if (reaction.type === type) {
        reactionNumbers = await this.postService.unreactToPost(postId, type);
        await this.reactionRepository.remove(reaction);
        return{ reaction: undefined, ...reactionNumbers };
      }
      isReactionExists = true;
      reaction.type = type;
    } else {
      const user = await this.userService.getUserById(userId);
      const post = await this.postService.getPostById(postId);

      if (!user || !post) {
        throw new BadRequestException('User or Post not found');
      }
      reaction = this.reactionRepository.create({ post, user, type });
    }
    reactionNumbers = await this.postService.reactToPost(postId, type, isReactionExists);
    await this.reactionRepository.save(reaction);
    return { reaction, ...reactionNumbers };
  }
}
