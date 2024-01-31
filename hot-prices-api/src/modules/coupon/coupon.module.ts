import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/models/entities/coupon.entity';
import { CategoryService } from '../category/category.service';
import { Category } from 'src/models/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, Category])],
  controllers: [CouponController],
  providers: [CouponService, CategoryService],
  exports: [CouponService],
})
export class CouponModule {}
