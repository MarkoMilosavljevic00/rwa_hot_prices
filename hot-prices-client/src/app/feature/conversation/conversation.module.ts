import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationItemComponent } from './components/conversation-item/conversation-item.component';
import { ConversationDetailsComponent } from './components/conversation-details/conversation-details.component';
import { ConversationFormularComponent } from './components/conversation-formular/conversation-formular.component';
import { ReactionModule } from '../reaction/reaction.module';
import { CommentModule } from '../comment/comment.module';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { conversationReducer } from './state/conversation.reducer';
import { ConversationEffects } from './state/conversation.effects';
import { ConversationFilterComponent } from './components/conversation-filter/conversation-filter.component';

@NgModule({
  declarations: [
    ConversationListComponent,
    ConversationItemComponent,
    ConversationDetailsComponent,
    ConversationFormularComponent,
    ConversationFilterComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    ReactionModule,
    CommentModule,
    StoreModule.forFeature('conversations', conversationReducer),
    EffectsModule.forFeature([ConversationEffects]),
    StoreRouterConnectingModule,
  ],
  exports: [
    ConversationListComponent,
    ConversationItemComponent,
    ConversationDetailsComponent,
    ConversationFilterComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ConversationModule {}
