import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AllExceptionFilter } from './common/filters/exceptions.filter';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(PORT);

  console.log('Server running on port ' + PORT);
}
bootstrap();
