import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';

@Component({
  templateUrl: './post-formular.component.html',
  styleUrls: ['./post-formular.component.css'],
})
export class PostFormularComponent {
  editMode: boolean = false;
  postType: PostType = PostType.Offer;

  constructor(
    private routeMappingService: RouteMappingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.editMode = this.routeMappingService.isEditMode(this.router.url);
    if (this.editMode) {
      this.postType = this.routeMappingService.mapUrlToPostType(
        this.router.url,
        false,
        2
      );
    }
    else{
      this.postType = this.routeMappingService.mapUrlToPostType(
        this.router.url,
        false,
        1
      );
    }
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.postType = this.routeMappingService.mapUrlToPostType(
    //       event.url,
    //       false
    //     );
    //   }
    // });
  }
}
