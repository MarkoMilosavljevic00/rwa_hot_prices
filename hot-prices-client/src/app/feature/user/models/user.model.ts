import { Role } from "../../../common/enums/role.enum";
import { Post } from "../../post/models/post";
import { Reaction } from "../../post/models/reaction";
import { Report } from "../../post/models/report";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  imgPath?: string;
  posts?: Post[];
  reactions?: Reaction[];
  comments?: Comment[];
  submittedReports?: Report[];
  receivedReports?: Report[];
}