import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { Reaction } from './reaction.entity';
import { Report } from './report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true})
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  registrationDate: Date;

  @Column({ nullable: true })
  profilePicture: string;

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
