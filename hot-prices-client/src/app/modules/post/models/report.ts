import { ReportType } from 'src/app/common/enums/report-type.enum';
import { User } from '../../user/models/user.model';
import { Post } from './post';

export interface Report {
  id: number;
  type: ReportType;
  description?: string;
  reportedBy: User;
  reportedUser: User;
  post: Post;
}
