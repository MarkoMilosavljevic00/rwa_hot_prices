import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReactionDto } from '../models/dtos/reaction.dto';
import { Reaction } from '../models/reaction.model';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  constructor(private http: HttpClient) {}

  getReactionByUserAndPostId(userId: number, postId: number) {
    return this.http.get<{
      reaction?: Reaction;
      numOfHotReactions: number;
      numOfColdReactions: number;
      numOfDegrees: number;
    }>(`${environment.api}/reaction/${userId}/${postId}`);
  }

  postOrUpdateReaction(reactionDto: ReactionDto) {
    return this.http.patch<{
      reaction?: Reaction;
      numOfHotReactions: number;
      numOfColdReactions: number;
      numOfDegrees: number;
    }>(`${environment.api}/reaction`, reactionDto);
  }
}
