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
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from 'src/models/entities/offer.entity';
import { FormOfferDto } from 'src/modules/offer/dtos/form-offer.dto';
import { FilterOfferDto } from 'src/modules/offer/dtos/filter-offer.dto';
import { InitialValues } from 'src/common/interfaces/initial-values.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('offer')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/get-offers-by-filter')
  async getOffersByFilter(
    @Query()
    filterOfferDto: FilterOfferDto,
  ): Promise<{ offers: Offer[]; length: number }> {
    return await this.offerService.getByFilter(filterOfferDto);
  }

  @Get('/distinct-property-filter/:key')
  async getOffersDistinctPropertyFilter(
    @Param('key') key: string,
    @Query() filterOfferDto: FilterOfferDto,
  ): Promise<string[]> {
    return await this.offerService.getDistinctProperty(key, filterOfferDto);
  }

  @Get('/distinct-property/:key')
  async getOffersDistinctProperty(@Param('key') key: string): Promise<string[]> {
    return await this.offerService.getDistinctProperty(key);
  }

  @Get('/all')
  async getAllOffers(): Promise<Offer[]> {
    return await this.offerService.getAll();
  }

  @Get('/:id')
  async getOfferById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return await this.offerService.getById(id);
  }

  @Post()
  async createOffer(@Body() formOfferDto: FormOfferDto) {
    return await this.offerService.create(formOfferDto);
  }

  @Patch('cleanNotFoundedImages')
  async cleanNotFoundedImages(): Promise<void> {
    const offers = await this.offerService.getAll();
    return this.offerService.cleanNotFoundedImages(offers);
  }

  @Patch('/:id')
  async updateOffer(
    @Param('id') id: number,
    @Body() updateOfferDto: FormOfferDto,
  ): Promise<Offer> {
    return await this.offerService.update(id, updateOfferDto);
  }

  @Delete('/:id')
  async deleteOffer(@Param('id') id: number): Promise<Offer> {
    return await this.offerService.delete(id);
  }

}
