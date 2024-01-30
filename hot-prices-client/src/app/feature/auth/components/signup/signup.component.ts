import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { DEFAULT, IMAGES_URL, UPLOAD_IMAGES_URL } from 'src/app/common/constants';
import { ImageType } from 'src/app/common/enums/image-type.enum';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @ViewChild('signupForm') signupForm: FormGroup;
  uploadedImage: string;

  readonly UPLOAD_IMAGES_URL = UPLOAD_IMAGES_URL + ImageType.UserImage;
  readonly AVATAR_STYLE = {
    width: '150px',
    height: '150px',
    border: '5px solid #f44336',
  };

  constructor(private store: Store<AppState>) {}

  onSelectProfilePicture(fileUpload: FileUpload, event: FileSelectEvent) {
    fileUpload.upload();
  }

  onUploadProfilePicture(event: any) {
    this.uploadedImage = event.originalEvent.body[0];
  }

  onSubmit(form: NgForm) {
    if(this.uploadedImage && this.uploadedImage.trim() !== '') {
      form.value.image = this.uploadedImage;
    }
  }

  formatImage(imgPath: string | undefined) {
    if (imgPath) {
      return IMAGES_URL + `/${ImageType.UserImage}/` + imgPath;
    } else {
      return DEFAULT.USER.IMAGE;
    }
  }
}
