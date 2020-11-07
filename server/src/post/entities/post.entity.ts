import { ObjectType, Field } from '@nestjs/graphql';
import { Topic } from 'src/topic/entities/topic.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User, { description: 'The user who created this Post.' })
  @ManyToOne(() => User, user => user.posts)
  creator: User;

  @Field(() => Topic)
  @ManyToOne(() => Topic, topic => topic.posts)
  topic: Topic;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}
