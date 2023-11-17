import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column('varchar', { array: true })
  imgPaths: string[];

  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @ManyToOne(() => User, user => user.comments)
  owner: User;
}