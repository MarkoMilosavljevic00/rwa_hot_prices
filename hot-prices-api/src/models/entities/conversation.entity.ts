import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable, ChildEntity } from 'typeorm';
import { Post } from './post.entity';

@ChildEntity()
export class Conversation extends Post {
  @Column({ nullable: false })
  content: string;
}