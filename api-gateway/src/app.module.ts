import { Module } from '@nestjs/common';
import { CourseController } from './course/course.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [CourseController, AuthController],
  providers: [],
})
export class AppModule {}