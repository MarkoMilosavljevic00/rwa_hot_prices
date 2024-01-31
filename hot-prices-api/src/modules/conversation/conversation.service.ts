import { Injectable } from '@nestjs/common';
import { FilterConversationDto } from './dtos/filter-conversation.dto';
import { Conversation } from 'src/models/entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Post } from 'src/models/entities/post.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private categoryService: CategoryService,
  ) {}

  async getQueryFromFilter1(
    query: SelectQueryBuilder<Post>,
    filterConversationDto: FilterConversationDto,
  ): Promise<SelectQueryBuilder<Post>> {
    const {
      title,
      categoryId,
      ownerId,
    } = filterConversationDto;

    if (title) {
      query.andWhere('LOWER(post.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    if (categoryId) {
      const descendantIds =
        await this.categoryService.getAllDescendantIds(categoryId);
      query.andWhere('post.categoryId IN (:...ids)', {
        ids: [categoryId, ...descendantIds],
      });
    }

    if (ownerId) {
      query.andWhere('post.ownerId = :ownerId', { ownerId });
    }

    return query;
  }
}
