import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { KEYS } from 'src/app/common/constants';
import { PostType } from 'src/app/common/enums/post-type.enum';

@Injectable({
  providedIn: 'root',
})
export class RouteMappingService {
  private postsRouteToPostType: Map<string, PostType>;

  constructor(private route: ActivatedRoute) {
    this.postsRouteToPostType = new Map<string, PostType>([
      ['offer', PostType.OFFER],
      ['conversation', PostType.CONVERSATION],
      ['coupon', PostType.COUPON],
    ]);
  }

  getPostTypesValuesLowerCase(): string[] {
    return Object.values(PostType).map((value): string => value.toLowerCase());
  }

  getSegmet(urlString: string, offset: number): string {
    const segments = urlString.split('/');
    return segments[offset];
  }

  getSegmentFromBottom(urlString: string, offset: number): string {
    const segments = urlString.split('/');
    return segments[segments.length - offset];
  }

  getPostTypeFromUrl(url: string){
    const postTypes = this.getPostTypesValuesLowerCase();
    for (const postType of postTypes) {
      if (url.toLowerCase().includes(postType)) {
        return PostType[postType.toUpperCase() as keyof typeof PostType];
      }
    }
  
    return undefined;
  }

  mapUrlToPostType(urlString: string, plural: boolean = false, offset: number = 1): PostType {
    if (!urlString || urlString.trim() === '') {
      return PostType.OFFER;
    } else {
      let segment = this.getSegmentFromBottom(urlString, 1);
      segment = plural ? segment.substring(0, segment.length - 1) : segment;
      return this.postsRouteToPostType.get(segment) || PostType.OFFER;
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

  isEditMode(urlString: string): boolean {
    const lastSegment = this.getSegmentFromBottom(urlString, 1);
    return !this.getPostTypesValuesLowerCase().includes(lastSegment.toLowerCase());
}

  isUserPosts(url: string): boolean {
    const firstSegment = this.getSegmet(url, 1);
    return firstSegment.toLowerCase() === KEYS.USER;
  }
}
