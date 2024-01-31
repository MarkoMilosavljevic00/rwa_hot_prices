import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/models/entities/coupon.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { FilterCouponDto } from './dtos/filter-coupon.dto';
import { Post } from 'src/models/entities/post.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
    private categoryService: CategoryService,
  ) {}

  async getQueryFromFilter1(
    query: SelectQueryBuilder<Post>,
    filterCouponDto: FilterCouponDto,
  ): Promise<SelectQueryBuilder<Post>> {
    const { title, categoryId, ownerId, saleType, store, location, expired } =
      filterCouponDto;

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
      query.andWhere('post.expiryDate > CURRENT_TIMESTAMP');
    }

    return query;
  }
}
