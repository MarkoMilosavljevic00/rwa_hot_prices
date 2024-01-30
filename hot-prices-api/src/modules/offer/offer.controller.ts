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
import { FormOfferDto } from 'src/models/dtos/form-offer.dto';
import { FilterOfferDto } from 'src/models/dtos/filter-offer.dto';
import { FilterOfferValidationPipe } from './pipes/filter-offer.pipe';
import { InitialValues } from 'src/common/interfaces/initial-values.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('offer')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/get-offers-by-filter')
  getOffersByFilter(
    @Query()
    filterOfferDto: FilterOfferDto,
  ): Promise<{ offers: Offer[]; length: number }> {
    return this.offerService.getByFilter(filterOfferDto);
  }

  @Get('/distinct-property-filter/:key')
  getOffersDistinctPropertyFilter(
    @Param('key') key: string,
    @Query() filterOfferDto: FilterOfferDto,
  ): Promise<string[]> {
    return this.offerService.getDistinctProperty(key, filterOfferDto);
  }

  @Get('/distinct-property/:key')
  getOffersDistinctProperty(@Param('key') key: string): Promise<string[]> {
    return this.offerService.getDistinctProperty(key);
  }

  @Get('/all')
  getAllOffers(): Promise<Offer[]> {
    return this.offerService.getAll();
  }

  @Get('/:id')
  getOfferById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offerService.getById(id);
  }

  @Post()
  postOffer(@Body() formOfferDto: FormOfferDto) {
    return this.offerService.create(formOfferDto);
  }

  @Patch('cleanNotFoundedImages')
  async cleanNotFoundedImages(): Promise<void> {
    const offers = await this.offerService.getAll();
    return this.offerService.cleanNotFoundedImages(offers);
  }

  @Patch('/:id')
  updateOffer(
    @Param('id') id: number,
    @Body() updateOfferDto: FormOfferDto,
  ): Promise<Offer> {
    return this.offerService.update(id, updateOfferDto);
  }

  @Delete('/:id')
  deleteOffer(@Param('id') id: number): Promise<Offer> {
    return this.offerService.delete(id);
  }

}
