import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(helmet());  // breaks gql playground rn
  app.enableCors();
  await app.listen(process.env.OPEN_DISCOURSE_PORT ?? 8765);
}
bootstrap();
