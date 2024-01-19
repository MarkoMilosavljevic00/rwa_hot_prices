import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormOfferDto } from 'src/models/dtos/form-offer.dto';
import { Category } from 'src/models/entities/category.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { ImageType } from 'src/models/enums/image-type.enum';

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


  async getById(id: number): Promise<Offer> {
    return await this.offerRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async create(offerCreateDto: FormOfferDto): Promise<Offer> {
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
