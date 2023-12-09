import { Component, Input } from '@angular/core';
import { formatPostTime } from 'src/app/common/helpers/helpers';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.css']
})
export class ConversationItemComponent {
  @Input() conversation!: Conversation;

  getPostTime() {
    if(!this.conversation) 
      return 'Just posted';
    else
      return formatPostTime(this.conversation.postedDate);
  }
}
