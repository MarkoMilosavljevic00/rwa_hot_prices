import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { OFFERS } from 'src/app/feature/offer/services/offer.model';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { CONVERSATIONS } from 'src/app/feature/conversation/services/conversations.model';
import { COUPONS } from 'src/app/feature/coupon/services/coupons';
import { Coupon } from 'src/app/feature/coupon/models/coupon.model';
import { Conversation } from 'src/app/feature/conversation/models/conversation.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post?: Post;

  currentPostType: PostType = PostType.Offer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routeMappingService: RouteMappingService
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

    let DATA: Post[] | Conversation[] | Coupon[];

    switch (this.currentPostType) {
      case PostType.Offer:
        DATA = OFFERS;
        break;
      case PostType.Conversation:
        DATA = CONVERSATIONS;
        break;
      case PostType.Coupon:
        DATA = COUPONS;
        break;
    }

    this.post = DATA.find(
      (post) =>
        post.id === this.routeMappingService.getIdFromUrl(this.router.url, 1)
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.post = DATA.find(
          (post) =>
            post.id === this.routeMappingService.getIdFromUrl(event.url, 1)
        );
      }
    });

    console.log(this.post);
  }

  onEditPost() {
    this.router.navigate([
      `/posts/formular/${this.routeMappingService.mapPostTypeToUrl(
        this.currentPostType
      )}/${this.post?.id}`,
    ]);
  }
}
