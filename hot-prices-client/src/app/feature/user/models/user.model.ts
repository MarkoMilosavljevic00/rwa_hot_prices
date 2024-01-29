import { Role } from "../../../common/enums/role.enum";
import { Post } from "../../post/models/post.model";
import { Reaction } from "../../reaction/models/reaction.model";
import { UserActivity } from "./user-activity";

export interface User {
  id: number;
  username: string;
  email: string;
  // password: string;
  role: Role;
  registrationDate: Date;
  profilePicture: string;
  posts?: Post[];
  reactions?: Reaction[];
  comments?: Comment[];
  submittedReports?: Report[];
  receivedReports?: Report[];
  userActivity?: UserActivity;
}
