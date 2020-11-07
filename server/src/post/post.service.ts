import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/topic/entities/topic.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create({ content, title, topicId, userId }: CreatePostInput) {
    const [creator, topic] = await Promise.all([
      this.userRepository.findOne(userId),
      this.topicRepository.findOne(topicId)
    ]);
    this.logger.log(creator);
    this.logger.log(topic);
    const post = await this.postRepository.save({ creator, topic, content, title });
    this.logger.log(post);
    return post;
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: string) {
    return this.postRepository.findOne(id);
  }

  update(id: string, updatePostInput: UpdatePostInput) {
    return this.postRepository.update(id, updatePostInput);
  }

  remove(id: string) {
    return this.postRepository.delete(id);
  }
}
