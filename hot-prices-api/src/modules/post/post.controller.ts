import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { FilterPostDto } from './dtos/filter-post.dto';
import { Post as PostEntity } from 'src/models/entities/post.entity';
import { FormPostDto } from './dtos/form-post.dto';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { ResourceType } from 'src/common/enums/resource-type.enum';
import { PostType } from 'src/common/enums/post-type.enum';
import { FormOfferDto } from '../offer/dtos/form-offer.dto';
import { FormCouponDto } from '../coupon/dtos/form-coupon.dto';
import { FormConversationDto } from '../conversation/dtos/form-conversation.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() formPostDto: FormPostDto, @Req() req) {
    return await this.postService.create(req.user.id, formPostDto);
  }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard(ResourceType.POST))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('/:id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: FormOfferDto | FormCouponDto | FormConversationDto,
  ): Promise<PostEntity> {
    return await this.postService.update(id, updatePostDto);
  }

  // @Delete('cleanNotFoundedImages')
  // async cleanNotFoundedImages(): Promise<void> {
  //   const posts = await this.postService.getAll();
  //   return this.offerService.cleanNotFoundedImages(posts);
  // }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard(ResourceType.POST))
  @Delete('/:id')
  async deletePost(@Param('id') id: number): Promise<PostEntity> {
    return await this.postService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/get-posts-by-filter')
  async getOffersByFilter(
    @Query()
    filterPostDto: FilterPostDto,
  ): Promise<{ posts: PostEntity[]; length: number }> {
    return await this.postService.getByFilter(filterPostDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('/distinct-property/:postType/:key')
  // async getOffersDistinctProperty(
  //   @Param('postType') postType: PostType,
  //   @Param('key') key: string,
  // ): Promise<string[]> {
  //   return await this.postService.getDistinctProperty(key, { postType });
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('/distinct-property-filter/:key')
  async getOffersDistinctPropertyFilter(
    @Param('key') key: string,
    @Query() filterPostDto: FilterPostDto,
  ): Promise<string[]> {
    return await this.postService.getDistinctProperty(key, filterPostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:postType/:id')
  async getOfferById(
    @Param('id', ParseIntPipe) id: number,
    @Param('postType') postType: PostType,
  ): Promise<PostEntity> {
    return await this.postService.getById(id, postType);
  }
}
