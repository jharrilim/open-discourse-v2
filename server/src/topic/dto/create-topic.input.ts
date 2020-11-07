import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTopicInput {
  @Field(() => String, { description: 'The name of the Topic.' })
  name: string;
}
