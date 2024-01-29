import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormOfferDto } from 'src/models/dtos/form-offer.dto';
import { Category } from 'src/models/entities/category.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { ILike, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { FileService } from '../file/file.service';
import { ImageType } from 'src/common/enums/image-type.enum';
import { FilterOfferDto } from 'src/models/dtos/filter-offer.dto';
import { SortBy, SortType } from 'src/common/enums/sort.enum';
import { CategoryService } from '../category/category.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from 'src/models/entities/comment.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private fileService: FileService,
    private categoryService: CategoryService,
    private userService: UserService,
    private commentService: CommentService,
  ) {}

  async getAll(): Promise<Offer[]> {
    const offers = await this.offerRepository.find({ relations: ['category'] });
    // await this.cleanNotFoundedImages(offers);
    return offers;
  }

  async getOffersFilter(
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

    // if (categoryId) {
    //   query.andWhere('offer.categoryId = :categoryId', { categoryId });
    // }
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

  // getAvailableValues(filterOfferDto: FilterOfferDto): Promise<InitialValues> {
  //   return {}
  // }

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

  async getAllStores(): Promise<string[]> {
    const offers = await this.offerRepository.find({ select: ['store'] });
    return offers.map((offer) => offer.store);
  }

  async getTitles(search?: string): Promise<string[]> {
    let offers: Offer[];

    if (search && search.trim().length > 0) {
      const whereClause = {
        title: ILike(`%${search}%`),
      };
      offers = await this.offerRepository.find({
        where: whereClause,
        select: ['title'],
      });
    } else {
      offers = await this.offerRepository.find({ select: ['title'] });
    }

    return offers.map((offer) => offer.title);
  }

  async post(formOfferDto: FormOfferDto): Promise<Offer> {
    const { categoryId, ownerId } = formOfferDto;

    const owner = await this.userService.getUserById(ownerId);
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${ownerId} not found`);
    }

    const category = await this.categoryService.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const offer = this.offerRepository.create({
      ...formOfferDto,
      category,
      owner,
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
      console.log(error);
      throw new InternalServerErrorException('Failed to update the offer');
    }

    return this.offerRepository.findOne({ where: { id } });
  }

  async cleanNotFoundedImages(offers: Offer[]) {
    let offersToUpdate = [];
    for (let offer of offers) {
      let hasChanges = false;
      if (offer.imgPaths)
        for (let i = 0; i < offer.imgPaths.length; i++) {
          if (
            !this.fileService.isExists(ImageType.OfferImage, offer.imgPaths[i])
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
