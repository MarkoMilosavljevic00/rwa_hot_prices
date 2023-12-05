import { Component } from '@angular/core';
import { Role } from 'src/app/common/enums/role.enum';
import { User } from 'src/app/modules/user/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: User = {
    id: '1',
    email: 'user@gmail.com',
    username: 'user1',
    password: '123456',
    role: Role.User,
    imgPath: 'https://www.w3schools.com/howto/img_avatar.png',
  }
}
