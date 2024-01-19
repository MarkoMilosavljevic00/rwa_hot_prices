import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UploadedFiles,
  Put,
  Patch,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from 'src/models/entities/offer.entity';
import { FormOfferDto } from 'src/models/dtos/form-offer.dto';

@Controller('offers')
export class OfferController {
  constructor(
    private offerService: OfferService,
  ) {}

  @Get()
  getOffers(): Promise<Offer[]> {
    return this.offerService.getAll();
  }

  @Get('/:id')
  getOfferById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offerService.getById(id);
  }

  @Post()
  postOffer(@Body() offerCreateDto: FormOfferDto) {
    console.log(offerCreateDto);
    return this.offerService.create(offerCreateDto);
  }

  @Patch('/:id')
  async updateOffer(@Param('id') id: number, @Body() updateOfferDto: FormOfferDto): Promise<Offer> {
    return this.offerService.update(id, updateOfferDto);
  }

  @Patch('cleanNotFoundedImages')
  async cleanNotFoundedImages(): Promise<void> {
    const offers = await this.offerService.getAll();
    return this.offerService.cleanNotFoundedImages(offers);
  }

}
