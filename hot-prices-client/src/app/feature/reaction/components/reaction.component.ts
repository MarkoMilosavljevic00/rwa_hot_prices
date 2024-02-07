import { Component, Input } from '@angular/core';
import { Reaction } from '../models/reaction.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { loadReaction, postOrUpdateReaction } from '../state/reaction.action';
import { ReactionDto } from '../models/dtos/reaction.dto';
import { ReactionType } from 'src/app/common/enums/reaction-type.enum';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import { isNotUndefined } from 'src/app/common/type-guards';
import { Subscription, filter, switchMap } from 'rxjs';
import { DEFAULT } from 'src/app/common/constants';
import {
  selectCurrentReaction,
  selectReactionFeature,
} from '../state/reaction.selector';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css'],
})
export class ReactionComponent {
  numOfHotReactions: number = 0;
  numOfColdReactions: number = 0;
  numOfDegrees: number = 0;

  isHotReaction: boolean = false;
  isColdReaction: boolean = false;

  // reaction: ReactionDto;
  userId: number = DEFAULT.USER.ID;
  postId: number = DEFAULT.POST.ID;

  reactionSubscribe: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.reactionSubscribe = this.store
      .select(selectIdFromRouteParams)
      .pipe(
        filter(isNotUndefined),
        switchMap((id) => {
          this.postId = +id;
          this.store.dispatch(
            loadReaction({ postId: this.postId, userId: this.userId })
          );
          return this.store.select(selectReactionFeature);
        })
      )
      .subscribe(
        ({
          currentReaction,
          numOfHotReactions,
          numOfColdReactions,
          numOfDegrees,
        }) => {
          if (currentReaction) {
            this.isHotReaction = currentReaction.type === ReactionType.HOT;
            this.isColdReaction = currentReaction.type === ReactionType.COLD;
          }
          else{
            this.isHotReaction = false;
            this.isColdReaction = false;
          }
          this.numOfHotReactions = numOfHotReactions!;
          this.numOfColdReactions = numOfColdReactions!;
          this.numOfDegrees = numOfDegrees!;
        }
      );
  }

  ngOnDestroy(): void {
    this.reactionSubscribe.unsubscribe();
  }

  onColdReact() {
    const reaction: ReactionDto = {
      userId: this.userId,
      postId: this.postId,
      type: ReactionType.COLD,
    };
    console.log(reaction);
    this.store.dispatch(postOrUpdateReaction({ reaction }));
  }

  onHotReact() {
    const reaction: ReactionDto = {
      userId: this.userId,
      postId: this.postId,
      type: ReactionType.HOT,
    };
    console.log(reaction);
    this.store.dispatch(postOrUpdateReaction({ reaction }));
  }
}
