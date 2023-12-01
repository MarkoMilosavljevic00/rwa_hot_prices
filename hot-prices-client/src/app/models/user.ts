import { Role } from "../enums/role.enum";
import { Post } from "./post";
import { Reaction } from "./reaction";
import { Report } from "./report";

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