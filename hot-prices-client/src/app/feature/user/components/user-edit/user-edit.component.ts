import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/shared/components/yes-no-dialog/yes-no-dialog.component';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCurrentUser } from '../../state/user.selector';
import {
  DEFAULT,
  IMAGES_URL,
  LIMITS,
  UPLOAD_IMAGES_URL,
} from 'src/app/common/constants';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadEvent,
} from 'primeng/fileupload';
import { ImageType } from 'src/app/common/enums/image-type.enum';
import {
  updatePassword,
  updateProfilePicture,
  updateUsername,
} from '../../state/user.action';

// import { PasswordDialogComponent } from './password-dialog/password-dialog.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user?: User;

  readonly UPLOAD_IMAGES_URL = UPLOAD_IMAGES_URL + ImageType.UserImage;
  readonly USERNAME_MIN_LENGTH = LIMITS.USER.USERNAME_MIN_LENGTH;

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.user = { ...user! }));
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(YesNoDialogComponent, dialogConfig);
  }

  onSelectProfilePicture(fileUpload: FileUpload, event: FileSelectEvent) {
    fileUpload.upload();
  }

  onUploadProfilePicture(event: any) {
    const serverFilename = event.originalEvent.body[0];
    this.store.dispatch(
      updateProfilePicture({
        id: this.user!.id,
        profilePicture: serverFilename,
      })
    );
  }

  onChangeUsername(usernameForm: NgForm) {
    this.store.dispatch(
      updateUsername({
        id: this.user!.id,
        username: usernameForm.value.username,
      })
    );
  }

  onChangePassword(passwordForm: NgForm) {
    this.store.dispatch(
      updatePassword({
        id: this.user!.id,
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword,
      })
    );
  }

  onDeleteAccount() {
    let dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: 'Deleting your account will delete all your offers, coupons, conversations, and comments.',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

      }
    });
  }

  formatImage(imgPath: string | undefined) {
    if (imgPath) {
      return IMAGES_URL + `/${ImageType.UserImage}/` + imgPath;
    } else {
      return DEFAULT.USER.IMAGE;
    }
  }
}
