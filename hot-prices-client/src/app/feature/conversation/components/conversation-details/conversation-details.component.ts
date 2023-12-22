import { Component, OnInit } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { formatPostTime } from 'src/app/common/helpers/helpers';
import { Conversation } from '../../models/conversation.model';
import { CONVERSATIONS } from '../../services/conversations.model';

export interface ImageInfo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
}

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.css']
})
export class ConversationDetailsComponent implements OnInit {
  conversation?: Conversation;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.conversation = CONVERSATIONS.find(conversation => conversation.id === +this.route.snapshot.params['id']);
    this.route.params
      .subscribe((params: Params) => {
        this.conversation = CONVERSATIONS.find(conversation => conversation.id === +params['id'])
      });
    
  }

  getPostTime() {
    if(!this.conversation) 
      return 'Just posted';
    else
      return formatPostTime(this.conversation.postedDate);
  }

  editOffer(){

  }

  deleteOffer(){

  }

  reportOffer(){
    
  }

}
