
export class PostCommentDto {
  content: string;
  userId: number;
  postId: number;

  // @ManyToOne(() => User, user => user.comments)
  // owner: User;
}