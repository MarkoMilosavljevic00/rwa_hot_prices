import { EntityState } from "@ngrx/entity";
import { Comment } from "../models/comment.model";

export interface CommentState extends EntityState<Comment> {
}