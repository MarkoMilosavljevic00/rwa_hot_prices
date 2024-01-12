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

  getPostTypesValuesLowerCase(): string[] {
    return Object.values(PostType).map((value): string => value.toLowerCase());
  }

  getSegmentFromBottom(urlString: string, offset: number): string {
    const segments = urlString.split('/');
    return segments[segments.length - offset];
  }

  isEditMode(urlString: string): boolean {
      const lastSegment = this.getSegmentFromBottom(urlString, 1);
      return !this.getPostTypesValuesLowerCase().includes(lastSegment.toLowerCase());
  }

  mapUrlToPostType(urlString: string, plural: boolean = false, offset: number = 1): PostType {
    if (!urlString || urlString.trim() === '') {
      return PostType.Offer;
    } else {
      let segment = this.getSegmentFromBottom(urlString, 1);
      segment = plural ? segment.substring(0, segment.length - 1) : segment;
      return this.postsRouteToPostType.get(segment) || PostType.Offer;
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
