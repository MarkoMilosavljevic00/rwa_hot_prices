import { User } from '../../user/models/user.model';
import { Post } from './post.model';
import { Comment } from '../../comment/models/comment.model';
import { ReportType } from 'src/app/common/enums/report-type.enum';

export interface Report {
  id: number;
  type: ReportType;
  description: string;
  archived: boolean;
  reportedBy: User;
  reportedUser: User;
  post: Post;
  comment?: Comment;
}

// export interface ReportTest {
//   id?: number;
//   type?: ReportType;
//   description?: string;
//   reportDate?: Date;
//   reportedBy?: User;
//   reportedUser?: User;
//   post?: Post;
// }
