import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { Post } from 'src/models/entities/post.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { Category } from 'src/models/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Category])],
  controllers: [OfferController],
  providers: [OfferService]
})
export class OfferModule {}
