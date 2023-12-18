import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationItemComponent } from './components/conversation-item/conversation-item.component';
import { ConversationDetailsComponent } from './components/conversation-details/conversation-details.component';
import { ConversationFormularComponent } from './components/conversation-formular/conversation-formular.component';

@NgModule({
  declarations: [ConversationListComponent, ConversationItemComponent, ConversationDetailsComponent, ConversationFormularComponent],
  imports: [RouterModule, SharedModule],
  exports: [ConversationListComponent, ConversationItemComponent, ConversationDetailsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ConversationModule {}
