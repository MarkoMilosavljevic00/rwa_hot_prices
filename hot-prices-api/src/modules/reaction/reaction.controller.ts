import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { Reaction } from 'src/models/entities/reaction.entity';
import { ReactionDto } from './dtos/reaction.dto';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Get(':userId/:postId')
  getReactionByPostAndUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<{
    reaction: Reaction;
    numOfHotReactions: number;
    numOfColdReactions: number;
    numOfDegrees: number;
  }> {
    return this.reactionService.getReactionAndNumbers(userId, postId);
  }

  @Patch()
  async createOrUpdateReaction(@Body() reactionDto: ReactionDto) {
    return this.reactionService.createOrUpdateReaction(reactionDto);
  }
}
