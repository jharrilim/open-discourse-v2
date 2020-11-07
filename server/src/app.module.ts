import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TopicModule } from './topic/topic.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'lil_post',
      password: 'postaroo',
      database: 'opendiscourse',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      dropSchema: true,
    }),
    UserModule,
    PostModule,
    TopicModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
