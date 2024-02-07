import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormOfferDto } from 'src/modules/offer/dtos/form-offer.dto';
import { Category } from 'src/models/entities/category.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { ILike, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { FileService } from '../file/file.service';
import { ImageType } from 'src/common/enums/image-type.enum';
import { FilterOfferDto } from 'src/modules/offer/dtos/filter-offer.dto';
import { SortBy, SortType } from 'src/common/enums/sort.enum';
import { CategoryService } from '../category/category.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from 'src/models/entities/comment.entity';
import { UserService } from '../user/user.service';
import { Reaction } from 'src/models/entities/reaction.entity';
import { Post } from 'src/models/entities/post.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    private fileService: FileService,
    private categoryService: CategoryService,
    private userService: UserService,
    // private commentService: CommentService,
  ) {}

  async create(formOfferDto: FormOfferDto): Promise<Offer> {
    const { categoryId } = formOfferDto;

    // const owner = await this.userService.getUserById(ownerId);
    // if (!owner) {
    //   throw new NotFoundException(`Owner with ID ${ownerId} not found`);
    // }

    const category = await this.categoryService.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const offer = this.offerRepository.create({
      ...formOfferDto,
      category,
      // owner,
    });
    try {
      await this.offerRepository.save(offer);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create the offer: ${error}`);
    }
    return offer;
  }

  async update(id: number, updateOfferDto: FormOfferDto): Promise<any> {
    if (updateOfferDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateOfferDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateOfferDto.categoryId} not found`,
        );
      }
      updateOfferDto.category = category;
      delete updateOfferDto.categoryId;
    }
    try {
      await this.offerRepository.update(id, updateOfferDto);
    } catch (error) {
      // console.log(error);
      throw new InternalServerErrorException('Failed to update the offer');
    }

    return this.offerRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: [ 'comments', 'reactions' ],
    });
    if (!offer) {
      throw new NotFoundException(`Offer with ID "${id}" not found`);
    }

    if(offer.imgPaths){
      for (let imgPath of offer.imgPaths) {
        this.fileService.deleteImage(ImageType.POST_IMAGE, imgPath);
      }
    }

    // await this.commentRepository.remove(offer.comments);
    // await this.reactionRepository.remove(offer.reactions);

    return await this.offerRepository.remove(offer);
  }

  async getByFilter(
    filterOfferDto: FilterOfferDto,
  ): Promise<{ offers: Offer[]; length: number }> {
    let query = await this.getQueryFromFilter(filterOfferDto);

    const length = await query.getCount();

    query = this.getPagedQuery(
      query,
      filterOfferDto.pageSize,
      filterOfferDto.pageIndex,
    );
    query = this.getSortQuery(
      query,
      filterOfferDto.sortBy,
      filterOfferDto.sortType,
    );

    const offers = await query.getMany();
    return { offers, length };
  }

  async getById(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['category', 'owner'],
    });
  
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    if(offer.category)
      offer.category = await this.categoryService.getAncestorsTree(offer.category.id);
  
    return offer;
  }

  async getAll(): Promise<Offer[]> {
    const offers = await this.offerRepository.find({ relations: ['category'] });
    return offers;
  }

  async getDistinctProperty(
    key: string,
    filterOferrDto?: FilterOfferDto,
  ): Promise<string[]> {
    let query;

    if (filterOferrDto) {
      query = await this.getQueryFromFilter(filterOferrDto);
    } else {
      query = this.offerRepository.createQueryBuilder('offer')
      .andWhere('offer.expiryDate > CURRENT_TIMESTAMP');
    }
    query = query
      .select(`offer.${key}`, key)
      .andWhere(`offer.${key} IS NOT NULL`)
      .andWhere(`offer.${key} != ''`)
      .distinct(true);

    let offers = await query.getRawMany();

    // console.log(offers);

    return offers.map((offer) => {
      return offer[key];
    });
  }

  async getQueryFromFilter1(
    query: SelectQueryBuilder<Post>,
    filterOfferDto: FilterOfferDto,
  ): Promise<SelectQueryBuilder<Post>> {
    const {
      title,
      categoryId,
      ownerId,
      minPrice,
      maxPrice,
      minDiscount,
      maxDiscount,
      saleType,
      store,
      location,
      expired,
    } = filterOfferDto;

    // console.log(title);

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

    if (minPrice) {
      query.andWhere('post.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('post.price <= :maxPrice', { maxPrice });
    }

    if (minDiscount) {
      query.andWhere('post.discount >= :minDiscount', { minDiscount });
    }

    if (maxDiscount) {
      query.andWhere('post.discount <= :maxDiscount', { maxDiscount });
    }

    if (saleType) {
      query.andWhere('post.saleType = :saleType', { saleType });
    }

    if (store) {
      query.andWhere('LOWER(post.store) LIKE LOWER(:store)', {
        store: `%${store}%`,
      });
    }

    if (location) {
      query.andWhere('LOWER(post.location) LIKE LOWER(:location)', {
        location: `%${location}%`,
      });
    }

    if (expired === undefined || expired === false) {
      query.andWhere('(post.expiryDate IS NULL OR post.expiryDate > CURRENT_TIMESTAMP)');
    }

    return query;
  }

  async getQueryFromFilter(
    filterOfferDto: FilterOfferDto,
  ): Promise<SelectQueryBuilder<Offer>> {
    const {
      title,
      categoryId,
      ownerId,
      minPrice,
      maxPrice,
      minDiscount,
      maxDiscount,
      saleType,
      store,
      location,
      expired,
    } = filterOfferDto;

    const query = this.offerRepository.createQueryBuilder('offer');
    query.leftJoinAndSelect('offer.category', 'category');
    query.leftJoinAndSelect('offer.owner', 'owner');

    if (title) {
      query.andWhere('LOWER(offer.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    if (categoryId) {
      const descendantIds =
        await this.categoryService.getAllDescendantIds(categoryId);
      query.andWhere('offer.categoryId IN (:...ids)', {
        ids: [categoryId, ...descendantIds],
      });
    }

    if (ownerId) {
      query.andWhere('offer.ownerId = :ownerId', { ownerId });
    }

    if (minPrice) {
      query.andWhere('offer.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('offer.price <= :maxPrice', { maxPrice });
    }

    if (minDiscount) {
      query.andWhere('offer.discount >= :minDiscount', { minDiscount });
    }

    if (maxDiscount) {
      query.andWhere('offer.discount <= :maxDiscount', { maxDiscount });
    }

    if (saleType) {
      query.andWhere('offer.saleType = :saleType', { saleType });
    }

    if (store) {
      query.andWhere('LOWER(offer.store) LIKE LOWER(:store)', {
        store: `%${store}%`,
      });
    }

    if (location) {
      query.andWhere('LOWER(offer.location) LIKE LOWER(:location)', {
        location: `%${location}%`,
      });
    }

    if (expired === undefined || expired === false) {
      query.andWhere('offer.expiryDate > CURRENT_TIMESTAMP');
    }

    return query;
  }

  getSortQuery(
    query: SelectQueryBuilder<Offer>,
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
      query.orderBy(`offer.${sortField}`, sortOrder, 'NULLS LAST');
    }
    return query;
  }

  getPagedQuery(
    query: SelectQueryBuilder<Offer>,
    pageSize?: number,
    pageIndex?: number,
  ) {
    if (pageSize && pageIndex !== undefined) {
      query.skip(pageSize * pageIndex);
      query.take(pageSize);
    }
    return query;
  }

  // async getById(id: number): Promise<Offer> {
  //   return await this.offerRepository.findOne({
  //     where: { id },
  //     relations: ['category', 'comments'],
  //   });
  // }

  async cleanNotFoundedImages(offers: Offer[]) {
    let offersToUpdate = [];
    for (let offer of offers) {
      let hasChanges = false;
      if (offer.imgPaths)
        for (let i = 0; i < offer.imgPaths.length; i++) {
          if (
            !this.fileService.isExists(ImageType.POST_IMAGE, offer.imgPaths[i])
          ) {
            offer.imgPaths.splice(i, 1);
            i--;
            hasChanges = true;
          }
        }
      if (hasChanges) {
        offersToUpdate.push(offer);
      }
    }

    if (offersToUpdate.length > 0)
      await this.offerRepository.save(offersToUpdate);
  }
}
