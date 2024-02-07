import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Comment } from '../../models/comment.model';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { deleteComment } from '../../state/comment.action';
import { selectCurrentUserId } from 'src/app/feature/user/state/user.selector';
import { ImageType } from 'src/app/common/enums/image-type.enum';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  isOwner: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectCurrentUserId).subscribe((id) =>{
      if(this.comment && id){
        this.isOwner = this.comment.owner.id === id
      }
    })
  }

  formatDate(date: Date): Date {
    return new Date(date);
  }

  formatImage(imgPath?: string): string | undefined {
    if (imgPath) {
      return IMAGES_URL + `/${ImageType.PROFILE_PICTURE}/` + imgPath;
    } else {
      return DEFAULT.USER.IMAGE;
    }
  }

  onDeleteComment() {
    this.store.dispatch(deleteComment({ commentId: this.comment.id }));
  }
}
