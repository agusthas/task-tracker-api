import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT || 8000, '0.0.0.0');
  new Logger('Bootstrap').log(
    `Application is running on: ${await app.getUrl()}`,
  );
})();
