import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";
import { Report } from "./report.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  postedDate: Date;

  @Column({ type: 'boolean', default: false })
  restricted: boolean;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Report, report => report.comment)
  reports: Report[];
}