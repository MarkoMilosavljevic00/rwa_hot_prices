import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionType } from 'src/common/enums/reaction-type.enum';
import { Post } from 'src/models/entities/post.entity';
import { Repository, SelectQueryBuilder, TreeRepository } from 'typeorm';
import { OfferService } from '../offer/offer.service';
import { ConversationService } from '../conversation/conversation.service';
import { FilterPostDto } from './dtos/filter-post.dto';
import { FormPostDto } from './dtos/form-post.dto';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { Conversation } from 'src/models/entities/conversation.entity';
import { PostType } from 'src/common/enums/post-type.enum';
import { Offer } from 'src/models/entities/offer.entity';
import { Coupon } from 'src/models/entities/coupon.entity';
import { CouponService } from '../coupon/coupon.service';
import { SortBy, SortType } from 'src/common/enums/sort.enum';
import { Category } from 'src/models/entities/category.entity';
import { FileService } from '../file/file.service';
import { ImageType } from 'src/common/enums/image-type.enum';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>,
    private offerService: OfferService,
    private conversationService: ConversationService,
    private couponService: CouponService,
    private userService: UserService,
    private categoryService: CategoryService,
    private fileService: FileService,
  ) {}

  async create(ownerId: number, createPostDto: FormPostDto) {
    const { categoryId, postType } = createPostDto;

    const owner = await this.userService.getUserById(ownerId);
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${ownerId} not found`);
    }

    const category = await this.categoryService.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    let repository;
    if (postType === PostType.OFFER) {
      repository = this.offerRepository;
    } else if (postType === PostType.CONVERSATION) {
      repository = this.conversationRepository;
    } else if (postType === PostType.COUPON) {
      repository = this.couponRepository;
    } else {
      throw new BadRequestException('Invalid Post Type');
    }

    const post = repository.create({
      ...createPostDto,
      category,
      owner,
    });

    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create the Post: ${error}`,
      );
    }
    return post;
  }

  async update(id: number, updatePostDto: FormPostDto): Promise<Post> {
    const { postType } = updatePostDto;

    console.log(updatePostDto);

    let repository;
    if (postType === PostType.OFFER) {
      repository = this.offerRepository;
    } else if (postType === PostType.CONVERSATION) {
      repository = this.conversationRepository;
    } else if (postType === PostType.COUPON) {
      repository = this.couponRepository;
    } else {
      throw new BadRequestException('Invalid Post Type');
    }

    let post = await repository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`${postType} with ID ${id} not found`);
    }

    if (updatePostDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updatePostDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updatePostDto.categoryId} not found`,
        );
      }
      updatePostDto.category = category;
      delete updatePostDto.categoryId;
    }

    try {
      await repository.update(id, updatePostDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to update the Post');
    }

    post = { ...post, ...updatePostDto };
    return post;
  }

  async delete(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'reactions'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    if ((post instanceof Offer || post instanceof Coupon) && post.imgPaths) {
      for (let imgPath of post.imgPaths) {
        if (this.fileService.isExists(ImageType.POST_IMAGE, imgPath)) {
          this.fileService.deleteImage(ImageType.POST_IMAGE, imgPath);
        }
      }
    }

    return await this.postRepository.remove(post);
  }

  async getById(id: number, postType: PostType): Promise<Post> {
    let repository: Repository<Post>;
    if (postType === PostType.OFFER) {
      repository = this.offerRepository;
    }
    else if (postType === PostType.CONVERSATION) {
      repository = this.conversationRepository;
    }
    else if (postType === PostType.COUPON) {
      repository = this.couponRepository;
    }
    else
      throw new BadRequestException('Invalid Post Type');

    const post = await repository.findOne({
      where: { id },
      relations: ['category', 'owner'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} and Type ${postType} not found`);
    }

    if (post.restricted === true) {
      throw new BadRequestException(`Post with ID ${id} is restricted`);
    }

    if (post.category)
      post.category = await this.categoryRepository.findAncestorsTree(
        post.category,
      );

    return post;
  }

  async getByFilter(filterPostDto: FilterPostDto) {
    let repository: Repository<Post>;
    let service: OfferService | ConversationService | CouponService;
    const { postType } = filterPostDto;
    if (postType === PostType.OFFER) {
      repository = this.offerRepository;
      service = this.offerService;
    } else if (postType === PostType.CONVERSATION) {
      repository = this.conversationRepository;
      service = this.conversationService;
    } else if (postType === PostType.COUPON) {
      repository = this.couponRepository;
      service = this.couponService;
    } else {
      throw new BadRequestException('Invalid post type');
    }

    let query = repository.createQueryBuilder('post');
    query.leftJoinAndSelect('post.category', 'category');
    query.leftJoinAndSelect('post.owner', 'owner');
    query.where('post.restricted = false');

    // console.log(filterPostDto)

    query = await service.getQueryFromFilter1(query, filterPostDto);

    // console.log(query.getSql());

    const length = await query.getCount();

    query = this.getPagedQuery(
      query,
      filterPostDto.pageSize,
      filterPostDto.pageIndex,
    );
    query = this.getSortQuery(
      query,
      filterPostDto.sortBy,
      filterPostDto.sortType,
    );

    const posts = await query.getMany();
    // console.log('iz post servisa');
    // console.log(posts);
    return { posts, length };
  }

  
  async getDistinctProperty(key: string, filterPostDto: FilterPostDto): Promise<string[]> {
    let repository: Repository<Post>;
    let service: OfferService | ConversationService | CouponService;
    const { postType } = filterPostDto;
    if (postType === PostType.OFFER) {
      repository = this.offerRepository;
      service = this.offerService;
    } else if (postType === PostType.CONVERSATION) {
      repository = this.conversationRepository;
      service = this.conversationService;
    } else if (postType === PostType.COUPON) {
      repository = this.couponRepository;
      service = this.couponService;
    } else {
      throw new BadRequestException('Invalid post type');
    }

    let query = repository.createQueryBuilder('post');
    query.leftJoinAndSelect('post.category', 'category');
    query.leftJoinAndSelect('post.owner', 'owner');
    query.where('post.restricted = false');
    
    if (filterPostDto) {
      query = await service.getQueryFromFilter1(query, filterPostDto);
    } else {
      query = this.offerRepository.createQueryBuilder('post')
      .andWhere('(post.expiryDate IS NULL OR post.expiryDate > CURRENT_TIMESTAMP)');
    }
    query = query
      .select(`post.${key}`, key)
      .andWhere(`post.${key} IS NOT NULL`)
      .andWhere(`post.${key} != ''`)
      .distinct(true);

    let offers = await query.getRawMany();

    console.log(offers);

    return offers.map((offer) => {
      return offer[key];
    });
  }

  getSortQuery(
    query: SelectQueryBuilder<Post>,
    sortBy?: SortBy,
    sortType?: SortType,
  ) {
    if (sortBy !== undefined || sortType !== undefined) {
      const sortField =
        sortBy === SortBy.DEGREES
          ? 'numOfDegrees'
          : sortBy === SortBy.POST_DATE
          ? 'postedDate'
          : sortBy === SortBy.EXPIRY_DATE
          ? 'expiryDate'
          : sortBy === SortBy.PRICE
          ? 'price'
          : sortBy === SortBy.DISCOUNT
          ? 'discount'
          : 'id';

      const sortOrder = sortType === SortType.DESC ? 'DESC' : 'ASC';
      query.orderBy(`post.${sortField}`, sortOrder, 'NULLS LAST');
    }
    return query;
  }

  getPagedQuery(
    query: SelectQueryBuilder<Post>,
    pageSize?: number,
    pageIndex?: number,
  ) {
    if (pageSize && pageIndex !== undefined) {
      query.skip(pageSize * pageIndex);
      query.take(pageSize);
    }
    return query;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

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
