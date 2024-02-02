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
  UseGuards,
} from '@nestjs/common';
import { FormOfferDto } from 'src/modules/offer/dtos/form-offer.dto';
import { Category } from 'src/models/entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/modules/category/dtos/create-category.dto';
import { GetCategoryDto } from 'src/modules/category/dtos/get-category.dto';
import { DeleteCategoryDto } from 'src/modules/category/dtos/delete-category.dto';
import { ChildHandlingMethod } from 'src/common/enums/child-handling-method.enum';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  post(@Body() createCategoryDto: CreateCategoryDto) {
    // console.log(createCategoryDto);
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get')
  get(@Body() getCategoryDto: GetCategoryDto): Promise<Category[]> {
    return this.categoryService.get(getCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete()
  delete(
    @Query('id', ParseIntPipe) id: number,
    childHandlingMethod: ChildHandlingMethod = ChildHandlingMethod.DETACH,
  ): Promise<Category[]> {
    return this.categoryService.delete(id, childHandlingMethod);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/test/:id')
  getTest(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.categoryService.getTest(id);
  }
}
