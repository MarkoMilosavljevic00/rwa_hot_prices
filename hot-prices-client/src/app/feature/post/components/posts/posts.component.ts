import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnChanges {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;

  currentPostType: PostType = PostType.Offer;

  constructor(
    private routeMappingService: RouteMappingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.currentPostType = this.routeMappingService.mapUrlToPostType(
      this.router.url,
      true
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPostType = this.routeMappingService.mapUrlToPostType(
          event.url,
          true
        );
      }
    });
  }

  ngOnChanges() {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onAddNewFormular() {
    this.router.navigate([
      `/posts/formular/${this.routeMappingService.mapPostTypeToUrl(
        this.currentPostType
      )}`,
    ]);
  }
}
