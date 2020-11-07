import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicInput } from './dto/create-topic.input';
import { UpdateTopicInput } from './dto/update-topic.input';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  private readonly logger = new Logger(TopicService.name);

  constructor(
    @InjectRepository(Topic)
    private readonly topicRespoitory: Repository<Topic>
  ) {}

  async create(createTopicInput: CreateTopicInput) {
    const topic = this.topicRespoitory.create(createTopicInput);
    const topicEntity = await this.topicRespoitory.save(topic);
    this.logger.log(topicEntity);
    return topicEntity;
  }

  findAll() {
    return this.topicRespoitory.find();
  }

  findOne(id: string) {
    return this.topicRespoitory.findOne(id);
  }

  update(id: string, updateTopicInput: UpdateTopicInput) {
    return this.topicRespoitory.update(id, updateTopicInput);
  }

  remove(id: string) {
    return this.topicRespoitory.delete(id);
  }
}
