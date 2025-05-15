import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'course-service',
      port: 3000,
    },
  });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'auth-service',
      port: 3001,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();