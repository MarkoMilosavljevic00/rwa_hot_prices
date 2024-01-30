import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user/models/user.model';
import { environment } from 'src/environments/environment';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { SignupAuthDto } from '../dtos/signup-auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginAuthDto: LoginAuthDto) {
    return this.http.post<{ user: User; accessToken: string }>(
      `${environment.api}/auth/login`,
      loginAuthDto
    );
  }

  loginByToken(token: string) {
    console.log('login by token', token);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<{ user: User; accessToken: string }>(
      `${environment.api}/auth/loginByToken`,
      { headers }
    );
  }

  signup(signupAuthDto: SignupAuthDto) {
    return this.http.post<{ user: User; accessToken: string }>(
      `${environment.api}/auth/signup`,
      signupAuthDto
    );
  }
}
