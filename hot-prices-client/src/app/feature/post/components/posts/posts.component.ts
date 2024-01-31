import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, Observable, of, startWith, Subscription, switchMap } from 'rxjs';
import { KEYS } from 'src/app/common/constants';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { OfferService } from 'src/app/feature/offer/services/offer.service';
import { changeSearchFilter, clearFilter, loadTitles } from 'src/app/feature/offer/state/offer.action';
import { selectOffersTitles } from 'src/app/feature/offer/state/offer.selector';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';
import { selectUrl } from 'src/app/state/app.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  @Input() isUserPosts: boolean = false;

  titlesOptions: string[];
  filteredTitlesOptions: string[];
  subscription: Subscription;

  searchControl = new FormControl();

  postType: PostType;

  readonly PostType = PostType;

  constructor(
    private routeMappingService: RouteMappingService,
    private offerService: OfferService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // this.filteredOptions = this.searchControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );

    // this.currentPostType = this.routeMappingService.mapUrlToPostType(
    //   this.router.url,
    //   true
    // );
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.currentPostType = this.routeMappingService.mapUrlToPostType(
    //       event.url,
    //       true
    //     );
    //   }
    this.subscription = this.store
      .select(selectUrl)
      .pipe(
        switchMap((url) => {
          this.isUserPosts = this.routeMappingService.isUserPosts(url);
          this.postType = this.routeMappingService.mapUrlToPostType(url, true);
          if (this.postType === PostType.OFFER){
            this.store.dispatch(loadTitles({ filterOffer: {} }));
            return this.store.select(selectOffersTitles);
            // return this.offerService.getOfferDistinctProperty(KEYS.OFFER.TITLE);
          }
          else return of([]);
        })
      )
      .subscribe((titles) => {
        console.log('loadujem titles')
        this.titlesOptions = titles;
        this.filteredTitlesOptions = titles;
      });
  }

  ngOnDestroy() {
    this.store.dispatch(clearFilter());
    this.subscription.unsubscribe();
  }

  onSearchChange(search: string){
    this.filteredTitlesOptions = this._filter(search);
  }

  onSearch(search: string) {
    this.store.dispatch(changeSearchFilter({ search }));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.titlesOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onAddNew() {
    this.router.navigate([
      `/posts/formular/${this.routeMappingService.mapPostTypeToUrl(
        this.postType
      )}`,
    ]);
  }
}
