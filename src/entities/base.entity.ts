import { ObjectType, Field, GraphQLTimestamp } from 'type-graphql';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType({ description: 'Base entity' })
export class BaseEntity {
  @Field(() => GraphQLTimestamp, { description: 'Created date' })
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => GraphQLTimestamp, { description: 'Last update date' })
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => Boolean, { description: 'Is active' })
  @Column({
    type: 'boolean',
    default: true
  })
  isActive!: boolean;
}
