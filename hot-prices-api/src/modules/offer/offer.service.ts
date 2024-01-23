import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormOfferDto } from 'src/models/dtos/form-offer.dto';
import { Category } from 'src/models/entities/category.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { ImageType } from 'src/common/enums/image-type.enum';
import { FilterOfferDto } from 'src/models/dtos/filter-offer.dto';
import { SortBy, SortType } from 'src/common/enums/sort.enum';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private fileService: FileService,
  ) {}

  async getAll(): Promise<Offer[]> {
    const offers = await this.offerRepository.find({ relations: ['category'] });
    // await this.cleanNotFoundedImages(offers);
    return offers;
  }

  async getFilter(
    filterOfferDto: FilterOfferDto,
  ): Promise<{ offers: Offer[]; length: number }> {
    const {
      title,
      pageSize,
      pageIndex,
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
      sortBy,
      sortType,
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
      query.andWhere('offer.categoryId = :categoryId', { categoryId });
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

    const length = await query.getCount();

    if (pageSize && pageIndex !== undefined) {
      query.skip(pageSize * pageIndex);
      query.take(pageSize);
    }

    const offers = await query.getMany();
    return { offers, length };
  }

  async getById(id: number): Promise<Offer> {
    return await this.offerRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async getDistinctProperty(key: string): Promise<string[]> {
    const offers = await this.offerRepository
      .createQueryBuilder('offer')
      .select(`offer.${key}`, key)
      .where(`offer.${key} IS NOT NULL`)
      .andWhere(`offer.${key} != ''`)
      .andWhere('offer.expiryDate > CURRENT_TIMESTAMP')
      .distinct(true)
      .getRawMany();

    return offers.map((offer) => {
      return offer[key]
    });
  }

  async getAllStores(): Promise<string[]> {
    const offers = await this.offerRepository.find({ select: ['store'] });
    console.log(offers);
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

  async create(offerCreateDto: FormOfferDto): Promise<Offer> {
    const offer = this.offerRepository.create({
      ...offerCreateDto,
    });
    console.log(offerCreateDto);
    try {
      await this.offerRepository.save(offer);
    } catch (error) {
      console.log(error);
    }
    return offer;
  }

  // async updateOffer(id: number, updateOfferDto: FormOfferDto): Promise<any> {
  //   const offer = await this.offerRepository.findOne({ where: { id } });
  //   if (!offer) {
  //     throw new NotFoundException(`Offer with ID ${id} not found`);
  //   }
  //   try {
  //     await this.offerRepository.update(id, updateOfferDto);
  //     return await this.offerRepository.findOne({ where: { id } });
  //   } catch (error) {
  //     console.log(error);
  //     throw new InternalServerErrorException('Failed to update the offer');
  //   }
  // }

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
