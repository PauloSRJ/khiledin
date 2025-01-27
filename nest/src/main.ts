import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: console,
  });
  app.useStaticAssets(join(__dirname, '..', '..', 'app', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'app', 'views'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
