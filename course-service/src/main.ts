import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CourseModule } from './course/course.module';
import { ConfigModule } from './config/config.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(CourseModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  const config = new DocumentBuilder()
    .setTitle('Course Service')
    .setDescription('Course service API documentation')
    .setVersion('1.0')
    .addTag('courses')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
