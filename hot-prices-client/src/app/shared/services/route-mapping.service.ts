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

  mapUrlToPostType(urlString: string, plural: boolean = false, offset: number = 1): PostType {
    if (!urlString || urlString.trim() === '') {
      return PostType.Offer;
    } else {
      const segments = urlString.split('/');
      let currentUrl;
      currentUrl = segments[segments.length - offset];
      currentUrl = plural ? currentUrl.substring(0, currentUrl.length - 1) : currentUrl;
      console.log(currentUrl);
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

  getIdFromUrl(urlString: string, offset: number = 1): number {
    if (!urlString || urlString.trim() === '') {
      return 0;
    } else {
      const segments = urlString.split('/');
      return Number(segments[segments.length - offset]);
    }
  }
}
