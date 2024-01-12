import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { OfferCreateDto } from 'src/models/dtos/offer-create.dto';
import { OfferService } from './offer.service';
import { Offer } from 'src/models/entities/offer.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { join } from 'path';
import * as path from 'path';
import { FileService } from '../file/file.service';

@Controller('offers')
export class OfferController {
  constructor(
    private offerService: OfferService,
  ) {}

  @Get()
  getOffers(): Promise<Offer[]> {
    return this.offerService.getOffers();
  }

  @Get('/:id')
  getOfferById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offerService.getOfferById(id);
  }

  @Post()
  postOffer(@Body() offerCreateDto: OfferCreateDto) {
    console.log(offerCreateDto);
    return this.offerService.createOffer(offerCreateDto);
  }

}
