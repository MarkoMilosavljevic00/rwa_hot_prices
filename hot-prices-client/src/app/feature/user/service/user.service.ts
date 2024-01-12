import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/common/enums/role.enum';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  getUser(id: number) {
    return this.http.get<User>(`${environment.api}/users/${id}`);
  }

  getUsers(){
    return this.http.get<User[]>(`${environment.api}/users`);
  }
}
