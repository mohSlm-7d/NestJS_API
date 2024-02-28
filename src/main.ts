/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, ()=>console.log(`The NestJS RESTful API server is listening on port ${3000}`));
}
bootstrap();
