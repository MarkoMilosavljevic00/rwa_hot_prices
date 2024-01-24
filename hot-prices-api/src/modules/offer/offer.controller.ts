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
  Query,
  ParseArrayPipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from 'src/models/entities/offer.entity';
import { FormOfferDto } from 'src/models/dtos/form-offer.dto';
import { FilterOfferDto } from 'src/models/dtos/filter-offer.dto';
import { FilterOfferValidationPipe } from './pipes/filter-offer.pipe';
import { InitialValues } from 'src/common/interfaces/initial-values.interface';

@Controller('offers')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Get()
  getOffers(
    @Query()
    filterOfferDto: FilterOfferDto,
  ): Promise<{ offers: Offer[]; length: number }> {
    return this.offerService.getPagedOffersAndLength(filterOfferDto);
  }

  // @Get('stores')
  // getOffersAllStores(): Promise<string[]> {
  //   return this.offerService.getAllStores();
  // }

  @Get('distinct-property/:key')
  getOffersDistinctProperty(@Param('key') key: string): Promise<string[]> {
    return this.offerService.getDistinctProperty(key);
  }

  // @Get('available-values')
  // getOffersAvailableValues(
  //   @Query()
  //   filterOfferDto: FilterOfferDto,
  // ): Promise<InitialValues> {
  //   return this.offerService.getAvailableValues(filterOfferDto);
  // }

  // @Get('titles')
  // getOffersTitles(@Query('search') search: string): Promise<string[]> {
  //   return this.offerService.getTitles(search);
  // }

  @Get('all')
  getAllOffers(): Promise<Offer[]> {
    return this.offerService.getAll();
  }

  @Get('/:id')
  getOfferById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offerService.getById(id);
  }

  @Post()
  postOffer(@Body() formOfferDto: FormOfferDto) {
    console.log(formOfferDto);
    return this.offerService.create(formOfferDto);
  }

  @Patch('/:id')
  async updateOffer(
    @Param('id') id: number,
    @Body() updateOfferDto: FormOfferDto,
  ): Promise<Offer> {
    return this.offerService.update(id, updateOfferDto);
  }

  @Patch('cleanNotFoundedImages')
  async cleanNotFoundedImages(): Promise<void> {
    const offers = await this.offerService.getAll();
    return this.offerService.cleanNotFoundedImages(offers);
  }
}
