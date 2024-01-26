import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionType } from 'src/common/enums/reaction-type.enum';
import { Post } from 'src/models/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  // async reactToPost(id: number, reactionType: ReactionType, isReactionExists: boolean) {
  //   const post = await this.postRepository.findOne({ where: { id } });
  //   if (!post) {
  //     throw new NotFoundException('Post not found');
  //   }

  //   if (reactionType === ReactionType.Hot) {
  //     await this.postRepository.increment({ id }, 'numOfHotReactions', 1);
  //     if(isReactionExists) {
  //       await this.postRepository.decrement({ id }, 'numOfColdReactions', 1);
  //       await this.postRepository.increment({ id }, 'numOfDegrees', 2);
  //     }
  //     else{
  //       await this.postRepository.increment({ id }, 'numOfDegrees', 1);
  //     }
  //   } else if (reactionType === ReactionType.Cold) {
  //     await this.postRepository.increment({ id }, 'numOfColdReactions', 1);
  //     if(isReactionExists) {
  //       await this.postRepository.decrement({ id }, 'numOfHotReactions', 1);
  //       await this.postRepository.decrement({ id }, 'numOfDegrees', 2);
  //     }
  //     else{
  //       await this.postRepository.decrement({ id }, 'numOfDegrees', 1);
  //     }
  //   }

  //   return this.postRepository.findOne({ where: { id } });
  // }

  async getReactionsNumbers(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      select: ['numOfHotReactions', 'numOfColdReactions', 'numOfDegrees'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const { numOfHotReactions, numOfColdReactions, numOfDegrees } = post;
    return { numOfHotReactions, numOfColdReactions, numOfDegrees };
  }

  async reactToPost(
    id: number,
    reactionType: ReactionType,
    isReactionExists: boolean,
  ) {
    const post = await this.postRepository.findOne({
      where: { id },
      select: ['numOfHotReactions', 'numOfColdReactions', 'numOfDegrees'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (reactionType === ReactionType.Hot) {
      post.numOfHotReactions += 1;
      if (isReactionExists) {
        post.numOfColdReactions -= 1;
        post.numOfDegrees += 2;
      } else {
        post.numOfDegrees += 1;
      }
    } else if (reactionType === ReactionType.Cold) {
      post.numOfColdReactions += 1;
      if (isReactionExists) {
        post.numOfHotReactions -= 1;
        post.numOfDegrees -= 2;
      } else {
        post.numOfDegrees -= 1;
      }
    }
    const { numOfHotReactions, numOfColdReactions, numOfDegrees } = post;

    try {
      await this.postRepository.update(id, post);
    } catch (error) {
      throw new BadRequestException(`Failed to update post: ${error.message}`);
    }

    return { numOfHotReactions, numOfColdReactions, numOfDegrees };
  }

  async unreactToPost(id: number, type: ReactionType) {
    const reactionNumbers = await this.getReactionsNumbers(id);

    if (type === ReactionType.Hot) {
      reactionNumbers.numOfHotReactions -= 1;
      reactionNumbers.numOfDegrees -= 1;
    } else if (type === ReactionType.Cold) {
      reactionNumbers.numOfColdReactions -= 1;
      reactionNumbers.numOfDegrees += 1;
    }

    try {
      await this.postRepository.update(id, reactionNumbers);
    } catch (error) {
      throw new BadRequestException(`Failed to update post: ${error.message}`);
    }

    return reactionNumbers;
  }

  // unreactToPost(postId: number, type: ReactionType) {
  //   if (type === ReactionType.Hot) {
  //     this.postRepository.decrement({ id: postId }, 'numOfHotReactions', 1);
  //     this.postRepository.decrement({ id: postId }, 'numOfDegrees', 1);
  //   } else if (type === ReactionType.Cold) {
  //     this.postRepository.decrement({ id: postId }, 'numOfColdReactions', 1);
  //     this.postRepository.increment({ id: postId }, 'numOfDegrees', 1);
  //   }
  // }
}
