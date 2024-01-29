import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KEYS } from './common/constants';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { autoLogin } from './feature/auth/state/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem(KEYS.TOKEN);
    if (accessToken) {
      console.log(accessToken);
      this.store.dispatch(autoLogin({ accessToken }));
    }
  }
}
