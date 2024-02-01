import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { Coupon } from 'src/app/feature/coupon/models/coupon.model';
import { Conversation } from 'src/app/feature/conversation/models/conversation.model';
import { Report } from '../../models/report.model';
import { MatDialog } from '@angular/material/dialog';
import { InputDialogComponent } from 'src/app/shared/components/input-dialog/input-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectDetailedOffer } from 'src/app/feature/offer/state/offer.selector';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { loadDetailedOffer } from 'src/app/feature/offer/state/offer.action';
import { selectUrl } from 'src/app/state/app.selectors';
import { selectDetailedConversation } from 'src/app/feature/conversation/state/conversation.selector';
import { deleteConversation } from 'src/app/feature/conversation/state/conversation.action';
import { selectDetailedCoupon } from 'src/app/feature/coupon/state/coupon.selector';
import { deleteCoupon } from 'src/app/feature/coupon/state/coupon.action';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post?: Post;
  postSubscription: Subscription;

  postType?: PostType;

  constructor(
    private router: Router,
    private routeMappingService: RouteMappingService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.store
      .select(selectUrl)
      .pipe(
        switchMap((url) => {
          this.postType = this.routeMappingService.getPostTypeFromUrl(url);
          if (this.postType === PostType.OFFER) {
            return this.store.select(selectDetailedOffer);
          } else if (this.postType === PostType.CONVERSATION) {
            return this.store.select(selectDetailedConversation);
          } else if (this.postType === PostType.COUPON) {
            return this.store.select(selectDetailedCoupon);
          } else return of();
        })
      )
      .subscribe((post) => {
        this.post = post;
      });
  }

  onEditPost() {
    this.router.navigate([
      `/posts/formular/${this.postType?.toLowerCase()}/${this.post?.id}`,
    ]);
  }

  onDeletePost() {
    if(this.postType === PostType.OFFER){
      // this.store.dispatch(deleteOffer({ offerId: this.post?.id! }));
    }
    else if(this.postType === PostType.CONVERSATION){
      this.store.dispatch(deleteConversation({ id: this.post?.id! }));
    }
    else if(this.postType === PostType.COUPON){
      this.store.dispatch(deleteCoupon({ id: this.post?.id! }));
    }
  }

  onReportPost() {
  }
}
