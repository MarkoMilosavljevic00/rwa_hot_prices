import { Component, Input } from '@angular/core';
import { Conversation } from 'src/app/models/conversation';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.css']
})
export class ConversationItemComponent {
  @Input() conversation!: Conversation;
}
