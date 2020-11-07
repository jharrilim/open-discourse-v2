import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String, {
    description: 'The ID of the user who is creating this post.',
  })
  userId: string;
  
  @Field(() => String, {
    description: 'The ID of the topic that this post belongs to.',
  })
  topicId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}
