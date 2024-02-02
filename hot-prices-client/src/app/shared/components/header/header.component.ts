import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Role } from 'src/app/common/enums/role.enum';
import { logout } from 'src/app/feature/auth/state/auth.action';
import { selectIsAuthenticated } from 'src/app/feature/auth/state/auth.selector';
import { User } from 'src/app/feature/user/models/user.model';
import { selectCurrentUser } from 'src/app/feature/user/state/user.selector';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user?: User;
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.user = user));
  }

  logout() {
    this.store.dispatch(logout());
  }

  isAdmin(): boolean {
    return this.user?.role === Role.ADMIN;
  }
}
