import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user?: User;

  constructor(
    private userService: UserService,
    private routeMappingService: RouteMappingService,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.routeMappingService.getSegmentFromBottom(this.router.url, 1);
    if (isNaN(+id)) {
      id = '5';
    }
    this.userService.getUser(+id).subscribe((user) => {
      this.user = user;
    });
  }
}
