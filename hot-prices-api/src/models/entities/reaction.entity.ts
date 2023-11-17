import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ReactionType } from '../enums/reaction-type.enum';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'enum', enum: ReactionType})
  type: ReactionType;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post)
  post: Post;
}