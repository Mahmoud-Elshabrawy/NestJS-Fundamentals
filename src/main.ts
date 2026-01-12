import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './common/interceptors/wrap-data.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  app.useGlobalInterceptors(new WrapDataInterceptor(), new TimeoutInterceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
