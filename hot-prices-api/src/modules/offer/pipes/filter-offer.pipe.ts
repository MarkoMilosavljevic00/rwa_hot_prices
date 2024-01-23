import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { FilterOfferDto } from 'src/models/dtos/filter-offer.dto';

@Injectable()
export class FilterOfferValidationPipe implements PipeTransform {
  async transform(value: FilterOfferDto, metadata: ArgumentMetadata) {
    if (value.pageIndex !== undefined) {
      value.pageIndex = Number(value.pageIndex);
      if (isNaN(value.pageIndex)) {
        throw new BadRequestException('Page index must be a number');
      }
    }
    if (value.pageSize !== undefined) {
      value.pageSize = Number(value.pageSize);
      if (isNaN(value.pageSize)) {
        throw new BadRequestException('Page size must be a number');
      }
    }
    // Here you can add more validation logic if needed
    return value;
  }
}