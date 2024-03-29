import { Component, Input, OnInit } from '@angular/core';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.css'],
})
export class ConversationItemComponent {
  @Input() conversation!: Conversation;

  constructor() {}

  formatContent(content: string): string {
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(content, 'text/html');
    return htmlDocument.body.textContent || '';
  }
}
