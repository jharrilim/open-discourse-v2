import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TopicService } from './topic.service';
import { Topic } from './entities/topic.entity';
import { CreateTopicInput } from './dto/create-topic.input';
import { UpdateTopicInput } from './dto/update-topic.input';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Mutation(() => Topic)
  createTopic(@Args('createTopicInput') createTopicInput: CreateTopicInput) {
    return this.topicService.create(createTopicInput);
  }

  @Query(() => [Topic], { name: 'topic' })
  findAll() {
    return this.topicService.findAll();
  }

  @Query(() => Topic, { name: 'topic' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.topicService.findOne(id);
  }

  @Mutation(() => Topic)
  updateTopic(@Args('updateTopicInput') updateTopicInput: UpdateTopicInput) {
    return this.topicService.update(updateTopicInput.id, updateTopicInput);
  }

  @Mutation(() => Topic)
  removeTopic(@Args('id', { type: () => String }) id: string) {
    return this.topicService.remove(id);
  }
}
