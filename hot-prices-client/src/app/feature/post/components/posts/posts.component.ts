import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { KEYS } from 'src/app/common/constants';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { OfferService } from 'src/app/feature/offer/services/offer.service';
import { changeSearchFilter } from 'src/app/feature/offer/state/offer.action';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';
import { selectUrl } from 'src/app/state/app.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  searchOption$: Observable<string[]>;
  titlesOptions: string[];
  filteredTitlesOptions: string[];

  searchControl = new FormControl();

  postType: PostType = PostType.Offer;
  PostType = PostType;

  constructor(
    private routeMappingService: RouteMappingService,
    private offerService: OfferService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.titlesOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

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
    this.store
      .select(selectUrl)
      .pipe(
        switchMap((url) => {
          this.routeMappingService.mapUrlToPostType(url, true);
          if (this.postType === PostType.Offer)
            return this.offerService.getOfferDistinctProperty(KEYS.OFFER.TITLE);
          // this.searchOptions = this.store.select(selectOffersTitles);
          else return of([]);
        })
      )
      .subscribe((titles) => {
        // console.log(titles);
        this.titlesOptions = titles
      });
  }

  onSearch(search: string) {
    this.filteredTitlesOptions = this._filter(search);
    this.store.dispatch(changeSearchFilter({ search }));
  }

  onAddNew() {
    this.router.navigate([
      `/posts/formular/${this.routeMappingService.mapPostTypeToUrl(
        this.postType
      )}`,
    ]);
  }
}
