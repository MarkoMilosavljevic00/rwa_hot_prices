import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { FilterOffer } from 'src/app/feature/offer/models/offer.filter';
import { FormConversationDto } from '../models/dtos/form-conversation.dto';
import { Conversation } from '../models/conversation.model';
import { FilterConversationDto } from '../models/dtos/filter-conversation.dto';
import { FilterConversation } from '../models/conversation.filter';


// Create Conversation 

export const createConversation = createAction(
  '[Conversation] Create Conversation',
  props<{ formConversationDto: FormConversationDto }>()
);

export const createConversationSuccess = createAction(
  '[Conversation] Create Conversation success',
  props<{ conversation: Conversation }>()
);

export const createConversationFailure = createAction(
  '[Conversation] Create Conversation failure',
  props<{ error: any }>()
);

// Update Conversation

export const updateConversation = createAction(
  '[Conversation] Update Conversation',
  props<{ id: number; formConversationDto: FormConversationDto }>()
);

export const updateConversationSuccess = createAction(
  '[Conversation] Update Conversation success',
  props<{ conversation: Conversation }>()
);

export const updateConversationFailure = createAction(
  '[Conversation] Update Conversation failure',
  props<{ error: any }>()
);

// Delete Conversation

export const deleteConversation = createAction(
  '[Conversation] Delete Conversation',
  props<{ id: number }>()
);

export const deleteConversationSuccess = createAction(
  '[Conversation] Delete Conversation success'
);

export const deleteConversationFailure = createAction(
  '[Conversation] Delete Conversation failure',
  props<{ error: any }>()
);

// Load Conversations

export const loadConversations = createAction(
  '[Conversation] Load Conversations',
  props<{ filterConversationDto: FilterConversationDto }>()
);

export const loadConversationsSuccess = createAction(
  '[Conversation] Load Conversations success',
  props<{ conversations: Conversation[]; length: number }>()
);

export const loadConversationsFailure = createAction(
  '[Conversation] Load Conversations failure',
  props<{ error: any }>()
);

// Load detailed Conversation

export const loadDetailedConversation = createAction(
  '[Conversation] Load detailed Conversation',
  props<{ id: number }>()
);

export const loadDetailedConversationSuccess = createAction(
  '[Conversation] Load detailed Conversation success',
  props<{ conversation: Conversation }>()
);

export const loadDetailedConversationFailure = createAction(
  '[Conversation] Load detailed Conversation failure',
  props<{ error: any }>()
);

export const clearDetailedConversation = createAction(
  '[Conversation] Clear detailed Conversation'
);

// Load editing Conversation

export const loadEditingConversation = createAction(
  '[Conversation] Load editing Conversation',
  props<{ id: number }>()
);

export const loadEditingConversationSuccess = createAction(
  '[Conversation] Load editing Conversation success',
  props<{ conversation: Conversation }>()
);

export const loadEditingConversationFailure = createAction(
  '[Conversation] Load editing Conversation failure',
  props<{ error: any }>()
);

export const clearEditingConversation = createAction(
  '[Conversation] Clear editing Conversation'
);

// Change Filter

export const changeConversationFilter = createAction(
  '[Conversation] Change Conversation filter',
  props<{ filterConversation: FilterConversation }>()
);

export const changeConversationPaginationFilter = createAction(
  '[Conversation] Change Conversation pagination filter',
  props<{ pagination: Pagination }>()
);

export const changeConversationSearchFilter = createAction(
  '[Conversation] Change Conversation search filter',
  props<{ search: string }>()
);

export const clearConversationFilter = createAction(
  '[Conversation] Clear Conversation filter'
);

// Load titles

export const loadConversationTitles = createAction(
  '[Conversation] Load Conversation titles',
  props<{ filterConversation: FilterConversation }>()
);

export const loadConversationTitlesSuccess = createAction(
  '[Conversation] Load Conversation titles success',
  props<{ titles: string[] }>()
);
