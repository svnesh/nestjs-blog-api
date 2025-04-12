import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './common/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(), {
      cors: true,
      logger: WinstonModule.createLogger(winstonLoggerConfig)
    }
  );
  await app.listen(3002);
}
bootstrap();
