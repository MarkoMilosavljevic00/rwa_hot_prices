import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { FilterOffer } from 'src/app/feature/offer/models/offer.filter';
import { FormConversationDto } from '../models/dtos/form-conversation.dto';
import { Conversation } from '../models/conversation.model';
import { FilterConversationDto } from '../models/dtos/filter-conversation.dto';

export const createConversation = createAction(
  '[Conversation] Create Conversation',
  props<{ formConversationDto: FormConversationDto }>()
);

export const updateConversation = createAction(
  '[Conversation] Update Conversation',
  props<{ id: number; formConversationDto: FormConversationDto }>()
);

export const submittedConversationSuccess = createAction(
  '[Conversation] Submitted Conversation success',
  props<{ conversation: Conversation }>()
);

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

export const loadDetailedConversation = createAction(
  '[Conversation] Load detailed Conversation',
  props<{ offerId: number }>()
);

export const loadDetailedConversationSuccess = createAction(
  '[Conversation] Load detailed Conversation success',
  props<{ offer: Conversation }>()
);

export const loadDetailedConversationFailure = createAction(
  '[Conversation] Load detailed Conversation failure'
);

export const clearDetailedConversation = createAction(
  '[Conversation] Clear detailed Conversation'
);

// export const clearFilter = createAction(
//   '[Offer] Clear filter'
// );

// export const changeFilter = createAction(
//   '[Offer] Change filter',
//   props<{ filterOffer: FilterOffer }>()
// );

// export const changePaginationFilter = createAction(
//   '[Offer] Change pagination filter',
//   props<{ pagination: Pagination }>()
// );

// export const changeSearchFilter = createAction(
//   '[Offer] Change search filter',
//   props<{ search: string }>()
// );

// export const loadTitles = createAction(
//   '[Offer] Load titles',
//   props<{ filterOffer: FilterOffer }>()
// );

// export const loadTitlesSuccess = createAction(
//   '[Offer] Load titles success',
//   props<{ titles: string[] }>()
// );

// export const loadEditingOffer = createAction(
//   '[Offer] Load editing offer',
//   props<{ offerId: number }>()
// );

// export const loadEditingOfferSuccess = createAction(
//   '[Offer] Load editing offer success',
//   props<{ offer: Offer }>()
// );

// export const loadEditingOfferFailure = createAction(
//   '[Offer] Load editing offer failure'
// );

// export const clearEditingOffer = createAction('[Offer] Clear editing offer');
