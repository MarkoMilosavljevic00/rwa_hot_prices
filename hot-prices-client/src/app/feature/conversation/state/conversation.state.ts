import { EntityState } from "@ngrx/entity";
import { Conversation } from "../models/conversation.model";
import { FilterConversation } from "../models/conversation.filter";

export interface ConversationState extends EntityState<Conversation> {
  filter?: FilterConversation;
  length: number;
  titles: string[]
  editingConversation?: Conversation;
  detailedConversation?: Conversation;
}