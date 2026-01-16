import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './common/interceptors/wrap-data.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Blocks
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  app.useGlobalInterceptors(new WrapDataInterceptor(), new TimeoutInterceptor())
  // app.useGlobalFilters(new CustomExceptionFilter())
  // app.useGlobalGuards(new AuthGuard())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
