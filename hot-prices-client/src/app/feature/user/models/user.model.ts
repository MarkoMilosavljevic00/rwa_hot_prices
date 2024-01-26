import { Role } from "../../../common/enums/role.enum";
import { Post } from "../../post/models/post.model";
import { Reaction } from "../../reaction/models/reaction.model";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  registrationDate: Date;
  imgPath: string;
  posts?: Post[];
  reactions?: Reaction[];
  comments?: Comment[];
  submittedReports?: Report[];
  receivedReports?: Report[];
}

export interface UserTest {
  id?: number;
  username?: string;
}