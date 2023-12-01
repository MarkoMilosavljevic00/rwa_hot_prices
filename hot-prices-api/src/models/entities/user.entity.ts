import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { Reaction } from './reaction.entity';
import { Report } from './report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column()
  imgPath: string;

  @OneToMany(() => Post, post => post.owner)
  posts: Post[];

  @OneToMany(() => Reaction, reaction => reaction.user)
  reactions: Reaction[];

  @OneToMany(() => Comment, comment => comment.owner)
  comments: Comment[];

  @OneToMany(() => Report, report => report.reportedBy)
  submittedReports: Report[];
  
  @OneToMany(() => Report, report => report.reportedUser)
  receivedReports: Report[];
}
