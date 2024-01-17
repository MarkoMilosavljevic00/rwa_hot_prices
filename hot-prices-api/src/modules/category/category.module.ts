import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Post } from 'src/models/entities/post.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { Category } from 'src/models/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
