import { Controller, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Conversation } from 'src/models/entities/conversation.entity';
import { ConversationService } from './conversation.service';
import { FilterConversationDto } from './dtos/filter-conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}


}
