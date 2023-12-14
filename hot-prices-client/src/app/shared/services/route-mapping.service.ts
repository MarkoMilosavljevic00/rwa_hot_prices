import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { PostType } from 'src/app/common/enums/post-type.enum';

@Injectable({
  providedIn: 'root',
})
export class RouteMappingService {
  private postsRouteToPostType: Map<string, PostType>;

  constructor(private route: ActivatedRoute) {
    this.postsRouteToPostType = new Map<string, PostType>([
      ['offer', PostType.Offer],
      ['conversation', PostType.Conversation],
      ['coupon', PostType.Coupon],
    ]);
  }

  mapUrlToPostType(urlString: string, plural: boolean = false): PostType {
    if (!urlString || urlString.trim() === '') {
      return PostType.Offer;
    } else {
      const segments = urlString.split('/');
      let currentUrl = segments[segments.length - 1];
      currentUrl = plural ? currentUrl.substring(0, currentUrl.length - 1) : currentUrl;
      return this.postsRouteToPostType.get(currentUrl) || PostType.Offer;
    }
  }

  mapPostTypeToUrl(postType: PostType): string {
    let result = '';
    this.postsRouteToPostType.forEach((value, key) => {
      if (value === postType) {
        result = key;
      }
    });
    return result;
  }
}
