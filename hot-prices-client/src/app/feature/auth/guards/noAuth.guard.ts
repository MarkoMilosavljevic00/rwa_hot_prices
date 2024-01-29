import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectIsAuthenticated } from '../state/auth.selector';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanLoad, CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((isAuthenticated) => !isAuthenticated)
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((isAuthenticated) => isAuthenticated)
    );
  }
}
