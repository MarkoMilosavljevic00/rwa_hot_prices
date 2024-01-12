import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { Post } from 'src/models/entities/post.entity';
import { Offer } from 'src/models/entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OfferController],
  providers: [OfferService]
})
export class OfferModule {}
