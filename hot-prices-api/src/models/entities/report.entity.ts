import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ReportType } from '../../common/enums/report-type.enum';
import { Conversation } from './conversation.entity';
import { Offer } from './offer.entity';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'enum', enum: ReportType })
  type: ReportType;

  @Column({ nullable: true})
  description: string;

  @ManyToOne(() => User, user => user.submittedReports, { onDelete: 'CASCADE' })
  reportedBy: User;
  
  @ManyToOne(() => User, user => user.receivedReports, { onDelete: 'CASCADE' })
  reportedUser: User;

  @ManyToOne(() => Post, post => post.reports, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Comment, comment => comment.reports, { onDelete: 'CASCADE' })
  comment: Comment;
}