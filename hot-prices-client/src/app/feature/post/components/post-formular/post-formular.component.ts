import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';

@Component({
  templateUrl: './post-formular.component.html',
  styleUrls: ['./post-formular.component.css']
})
export class PostFormularComponent {
  postType: PostType = PostType.Offer;

  constructor(
    private routeMappingService: RouteMappingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postType = this.routeMappingService.mapUrlToPostType(
      this.router.url,
      false
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.postType = this.routeMappingService.mapUrlToPostType(
          event.url,
          false
        );
      }
    });
  }

}
