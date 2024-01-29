import { Component, Input } from '@angular/core';
import { DEFAULT } from 'src/app/common/constants';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
})
export class UserAvatarComponent {
  @Input() name?: string;
  @Input() id?: string;
  @Input() _imgSrc?: string;
  @Input() nameFirst?: boolean;

  @Input()
  set imgSrc(value: string | undefined) {
    this._imgSrc = value && value.trim() !== '' ? value : DEFAULT.USER.IMAGE;
  }

  get imgSrc(): string | undefined {
    return this._imgSrc;
  }
}
