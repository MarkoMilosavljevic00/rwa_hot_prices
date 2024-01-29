import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { LoginAuthDto } from '../../dtos/login-auth.dto';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private store: Store<AppState>) {

  }

  onSubmit(form: NgForm){
    const loginAuthDto: LoginAuthDto = form.value;
    this.store.dispatch(login({ loginAuthDto }));
  }
}
