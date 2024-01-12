import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  OneToMany,
} from "typeorm"
import { Conversation } from "./conversation.entity";
import { Offer } from "./offer.entity";
import { Post } from "./post.entity";

@Entity()
@Tree("closure-table")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  name: string

  @Column({ nullable: true})
  description: string;

  @Column('varchar', { array: true, nullable: true },)
  imgPaths: string[];

  @TreeChildren()
  children: Category[]

  @TreeParent()
  parent: Category

  @OneToMany(() => Post, post => post.category)
  posts: Post[];
}