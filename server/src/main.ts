import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './config/seed.service';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  // Exclude properties not part of the original class when mapping between entity and dto.
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    const seedService = app.get(SeedService);
    await seedService.run();
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
