import { CreateTopicInput } from './create-topic.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTopicInput extends PartialType(CreateTopicInput) {
  @Field(() => String)
  id: string;
}
