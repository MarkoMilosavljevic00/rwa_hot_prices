import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/models/entities/conversation.entity';
import { CategoryService } from '../category/category.service';
import { Category } from 'src/models/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Category])],
  controllers: [ConversationController],
  providers: [ConversationService, CategoryService],
  exports: [ConversationService]
})
export class ConversationModule {}
