import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { Conversation } from '../models/conversation.model';
import { FilterConversationDto } from '../models/dtos/filter-conversation.dto';
import { FormConversationDto } from '../models/dtos/form-conversation.dto';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private readonly http: HttpClient) {}

  createConversation(formConversationDto: FormConversationDto) {
    return this.http.post<Conversation>(`${environment.api}/post`, formConversationDto);
  }

  updateConversation(id: number, formConversationDto: FormConversationDto) {
    return this.http.patch<Conversation>(`${environment.api}/post/${id}`, formConversationDto);
  }
  
  deleteConversation(id: number) {
    return this.http.delete<Conversation>(`${environment.api}/post/${id}`);
  }

  getConversationById(id: number) {
    return this.http.get<Conversation>(`${environment.api}/post/${id}`);
  }

  getConversationsByFilter(filterConversationDto: FilterConversationDto) {
    let params = new HttpParams();

    Object.keys(filterConversationDto).forEach((key: string) => {
      const value = filterConversationDto[key as keyof FilterConversationDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.CONVERSATION);

    return this.http.get<{ posts: Conversation[]; length: number }>(
      `${environment.api}/post/get-posts-by-filter`,
      { params }
    );
  }

  getConversationsDistinctProperty(key: string) {
    return this.http.get<string[]>(
      `${environment.api}/post/distinct-property/${key}`
    );
  }

  getConversationsDistinctPropertyByFilter(
    key: string,
    filterConversationDto: FilterConversationDto
  ) {
    let params = new HttpParams();

    Object.keys(filterConversationDto).forEach((key: string) => {
      const value = filterConversationDto[key as keyof FilterConversationDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.CONVERSATION);

    return this.http.get<string[]>(
      `${environment.api}/post/distinct-property-filter/${key}`,
      { params }
    );
  }
}
