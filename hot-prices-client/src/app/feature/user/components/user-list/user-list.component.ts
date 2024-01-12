import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/feature/user/models/user.model';
import { UserService } from 'src/app/feature/user/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  onePageUsers: User[] = [];

  page = 0;
  size = 5;

  constructor(private userService: UserService){

  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
      this.getData({ pageIndex: this.page, pageSize: this.size });
    });
  }

  getData(obj: {pageIndex: number, pageSize: number}) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.onePageUsers = this.users.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
