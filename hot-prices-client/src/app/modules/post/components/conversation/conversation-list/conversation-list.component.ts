import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../../models/conversation';
import { CONVERSATIONS } from './conversations.model';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  conversations: Conversation[] = CONVERSATIONS
  onePageConversations: Conversation[] = [];

  page = 0;
  size = 5;

  ngOnInit() {
    this.getData({ pageIndex: this.page, pageSize: this.size });
  }

  getData(obj: any) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.onePageConversations = this.conversations.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}