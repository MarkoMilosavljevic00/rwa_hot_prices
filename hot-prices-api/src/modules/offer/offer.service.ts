import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferCreateDto } from 'src/models/dtos/offer-create.dto';
import { Offer } from 'src/models/entities/offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfferService {

  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async getOffers(): Promise<Offer[]> {
    return await this.offerRepository.find();
  }

  async getOfferById(id: number): Promise<Offer> {
    return await this.offerRepository.findOne({where: {id}});
  }

  async createOffer(offerCreateDto: OfferCreateDto): Promise<Offer> {
    const offer = this.offerRepository.create({
      ...offerCreateDto,
      numOfColdReactions: 0,
      numOfHotReactions: 0,
      restricted: false,
    });
    console.log(offerCreateDto);
    try {
      await this.offerRepository.save(offer);
    } catch (error) {
      console.log(error);
    }
    return offer;
  }
}
