import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdOn: Date;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Post], { defaultValue: [] })
  @OneToMany(() => Post, post => post.creator, { nullable: true })
  posts: Post[];
}
