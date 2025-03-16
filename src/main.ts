import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(), {
      cors: true,
      logger: ['error', 'warn', 'log']
    }
  );
  await app.listen(3002);
}
bootstrap();
