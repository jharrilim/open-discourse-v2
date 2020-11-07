import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Topic {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @CreateDateColumn()
  createdOn: Date;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Post], {
    description: 'Content written by users pertaining to this topic.',
    defaultValue: [],
  })
  @OneToMany(() => Post, post => post.topic, { nullable: true })
  posts: Post[];

}
