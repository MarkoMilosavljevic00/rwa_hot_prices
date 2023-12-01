import { ReportType } from '../enums/report-type.enum';
import { Post } from './post';
import { User } from './user';

export interface Report {
  id: number;
  type: ReportType;
  description?: string;
  reportedBy: User;
  reportedUser: User;
  post: Post;
}
