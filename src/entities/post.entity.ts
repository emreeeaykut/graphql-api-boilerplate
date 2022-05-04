import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@ObjectType({ description: 'Post entity' })
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID, { description: 'Post id' })
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { description: 'Post title' })
  @Column()
  title!: string;

  @Field(() => String, { description: 'Post description' })
  @Column()
  description!: string;

  @Field(() => String, { description: 'Post content', nullable: true })
  @Column({ nullable: true })
  content?: string;
}
