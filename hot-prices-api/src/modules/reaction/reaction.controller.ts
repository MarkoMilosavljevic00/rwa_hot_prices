import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { Reaction } from 'src/models/entities/reaction.entity';
import { ReactionDto } from './dtos/reaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/:postId')
  getReactionByPostAndUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req
  ): Promise<{
    reaction: Reaction;
    numOfHotReactions: number;
    numOfColdReactions: number;
    numOfDegrees: number;
  }> {
    return this.reactionService.getReactionAndNumbers(req.user.id, postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async createOrUpdateReaction(@Body() reactionDto: ReactionDto, @Req() req) {
    return this.reactionService.createOrUpdateReaction(req.user.id, reactionDto);
  }
}
