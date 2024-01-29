import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { CONVERSATIONS } from 'src/app/feature/conversation/services/conversations.model';
import { Coupon } from 'src/app/feature/coupon/models/coupon.model';
import { Conversation } from 'src/app/feature/conversation/models/conversation.model';
import { Report } from '../../models/report.model';
import { MatDialog } from '@angular/material/dialog';
import { InputDialogComponent } from 'src/app/shared/components/input-dialog/input-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectDetailedOffer } from 'src/app/feature/offer/state/offer.selector';
import { Observable } from 'rxjs';
import { loadDetailedOffer } from 'src/app/feature/offer/state/offer.action';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post?: Post;
  post$: Observable<Post | undefined>;

  currentPostType: PostType = PostType.Offer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routeMappingService: RouteMappingService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.currentPostType = this.routeMappingService.mapUrlToPostType(
      this.router.url,
      false,
      2
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPostType = this.routeMappingService.mapUrlToPostType(
          event.url,
          false,
          2
        );
      }
    });

    if (this.currentPostType === PostType.Offer) {
      // this.store.dispatch(loadDetailedOffer({ offerId: this.routeMappingService.getIdFromUrl(this.router.url, 1) }));
      this.store.select(selectDetailedOffer).subscribe((offer) => {
        if (offer) {
          this.post = offer;
        }
      });
    }
    // let DATA: Post[] | Conversation[] | Coupon[];

    // switch (this.currentPostType) {
    //   case PostType.Offer:
    //     DATA = OFFERS;
    //     break;
    //   case PostType.Conversation:
    //     DATA = CONVERSATIONS;
    //     break;
    //   case PostType.Coupon:
    //     DATA = COUPONS;
    //     break;
    // }

    // this.post = DATA.find(
    //   (post) =>
    //     post.id === this.routeMappingService.getIdFromUrl(this.router.url, 1)
    // );
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.post = DATA.find(
    //       (post) =>
    //         post.id === this.routeMappingService.getIdFromUrl(event.url, 1)
    //     );
    //   }
    // });

    // console.log(this.post);
  }

  onEditPost() {
    this.router.navigate([
      `/posts/formular/${this.routeMappingService.mapPostTypeToUrl(
        this.currentPostType
      )}/${this.post?.id}`,
    ]);
  }

  onReportPost() {
    // const dialogRef = this.dialog.open(InputDialogComponent, {
    //   data: {
    //     title: 'Report Post',
    //     message: 'Please enter your report:',
    //     maxLength: 300,
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (result) {
    //     const report: Report = {
    //       id: 1,
    //       description: result,
    //     };
    //     console.log(report);
    //   } else console.log('Otkazan report');
    // });
  }
}
