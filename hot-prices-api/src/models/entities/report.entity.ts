import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ReportType } from '../enums/report-type.enum';
import { Conversation } from './conversation.entity';
import { Offer } from './offer.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: 'enum', enum: ReportType })
  type: ReportType;

  @Column({ nullable: true})
  description: string;

  @ManyToOne(() => User, user => user.submittedReports)
  reportedBy: User;
  
  @ManyToOne(() => User, user => user.receivedReports)
  reportedUser: User;

  @ManyToOne(() => Post, post => post.reports)
  post: Post;
}