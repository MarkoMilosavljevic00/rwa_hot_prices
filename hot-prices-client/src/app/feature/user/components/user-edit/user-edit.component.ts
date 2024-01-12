import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/shared/components/yes-no-dialog/yes-no-dialog.component';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';

// import { PasswordDialogComponent } from './password-dialog/password-dialog.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user: User;

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser(5).subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(YesNoDialogComponent, dialogConfig);
  }

  changeImage() {
    // implement the logic to change the user image
  }

  onFileSelected($event: any) {}

  onChangeUsername(usernameForm: NgForm) {
    // implement the logic to change the username
    // this.username = usernameForm.value.username;
    // console.log("Novi username:" + this.username);
    console.log(usernameForm);
  }

  onChangePassword(passwordForm: NgForm) {
    // open a dialog to enter the current and new passwords
    // this.dialog.open(PasswordDialogComponent);
  }

  onDeleteAccount() {
    let dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: 'Deleting your account will delete all your posts, comments, and conversations.',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) console.log('Brisanje naloga'); // Brisanje naloga
      else console.log('Otkazano brisanje naloga'); // Otkazano brisanje naloga
    });
  }
}
