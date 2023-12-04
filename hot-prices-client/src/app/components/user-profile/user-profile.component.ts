import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { YesNoDialog } from '../delete-acc-dialog/yes-no-dialog.component';

// import { PasswordDialogComponent } from './password-dialog/password-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  newUsername: string = '';
  pictureSrc: string = 'assets/default-user.jpg';
  num: number = 0;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(YesNoDialog, dialogConfig);
  }

  ngOnInit(): void {
    this.username = 'John Doe'; // get the username from the backend
    this.email = 'john@gmail.com';
    this.newUsername = this.username;
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
    let dialogRef = this.dialog.open(YesNoDialog, {
      data: 'Deleting your account will delete all your posts, comments, and conversations.',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        console.log('Brisanje naloga'); // Brisanje naloga
      else
        console.log('Otkazano brisanje naloga'); // Otkazano brisanje naloga
    });        
  }
}
