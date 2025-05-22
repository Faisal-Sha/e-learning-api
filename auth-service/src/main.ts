import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const config = new DocumentBuilder()
    .setTitle('Aladia Auth API')
    .setDescription('Authentication API for Aladia')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();