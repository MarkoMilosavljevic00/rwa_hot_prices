import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Query,
  Delete,
  ParseEnumPipe,
} from '@nestjs/common';
import { FormOfferDto } from 'src/models/dtos/form-offer.dto';
import { Category } from 'src/models/entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/models/dtos/create-category.dto';
import { GetCategoryDto } from 'src/models/dtos/get-category.dto';
import { DeleteCategoryDto } from 'src/models/dtos/delete-category.dto';
import { ChildHandlingMethod } from 'src/common/enums/child-handling-method.enum';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  post(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    return this.categoryService.create(createCategoryDto);
  }

  @Get('get')
  get(@Body() getCategoryDto: GetCategoryDto): Promise<Category[]> {
    return this.categoryService.get(getCategoryDto);
  }

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  // @Patch('/:id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() createCategoryDto: CreateCategoryDto,
  // ): Promise<Category> {
  //   return this.categoryService.update(id, createCategoryDto);
  // }

  @Delete()
  delete(
    @Query('id', ParseIntPipe) id: number,
    // @Query('childHandlingMethod', ParseIntPipe)
    childHandlingMethod: ChildHandlingMethod = ChildHandlingMethod.DETACH,
  ): Promise<Category[]> {
    return this.categoryService.delete(id, childHandlingMethod);
  }

  @Get('/test/:id')
  getTest(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.categoryService.getTest(id);
  }
}
