import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/common/enums/role.enum';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { UserActivity } from '../models/user-activity';
import { UpdateUserDto } from '../models/dtos/update-user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUserById(id: number) {
    return this.http.get<User>(`${environment.api}/user/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/user`);
  }

  getUserActivity(id: number) {
    return this.http.get<UserActivity>(
      `${environment.api}/user/getUserActivity/${id}`
    );
  }

  updateProfilePicture(id: number, profilePicture: string) {
    return this.http.patch<User>(
      `${environment.api}/user/updateProfilePicture/${id}`,
      { profilePicture }
    );
  }

  updateUsername(id: number, username: string) {
    return this.http.patch<User>(
      `${environment.api}/user/updateUsername/${id}`,
      { username }
    );
  }

  updatePassword(id: number, currentPassword: string, newPassword: string) {
    return this.http.patch<User>(
      `${environment.api}/user/updatePassword/${id}`,
      { currentPassword, newPassword }
    );
  }
}
