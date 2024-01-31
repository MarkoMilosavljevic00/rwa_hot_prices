import { Component, Input } from '@angular/core';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { ImageType } from 'src/app/common/enums/image-type.enum';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
})
export class UserAvatarComponent {
  @Input() name?: string;
  @Input() id?: number;
  @Input() _imgSrc?: string;
  @Input() imageType?: ImageType;
  @Input() nameFirst?: boolean;

  @Input()
  set imgSrc(value: string | undefined) {
    this._imgSrc =
      value && value.trim() !== ''
        ? `${IMAGES_URL}/${ImageType.PROFILE_PICTURE}/${value}`
        : DEFAULT.USER.IMAGE;
  }

  get imgSrc(): string | undefined {
    return this._imgSrc;
  }
}
