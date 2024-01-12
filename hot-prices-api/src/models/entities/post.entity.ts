import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, TableInheritance } from 'typeorm';
import { PostStatus } from '../enums/post-status.enum';
import { Category } from './category.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
import { Report } from './report.entity';
import { User } from './user.entity';

@Entity()
@TableInheritance({ column: { type: "varchar", name: "postType" } })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  title: string;

  @Column({ nullable: false })
  numOfHotReactions: number;

  @Column({ nullable: false })
  numOfColdReactions: number;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  postedDate: Date;

  // @Column({type: 'enum', enum: PostStatus})
  // status: PostStatus;

  @Column({ type: 'boolean' })
  restricted: boolean;

  @ManyToOne(() => User, user => user.posts)
  owner: User;

  @ManyToOne(() => Category, user => user.posts)
  category: Category;

  @OneToMany(() => Reaction, reaction => reaction.post)
  reactions: Reaction[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => Report, report => report.post)
  reports: Report[];
}