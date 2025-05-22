import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';

@Controller('courses')
export class CourseController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'course-service',
      port: 3000,
    },
  })
  private client: ClientTCP;

  @Get()
  async getAllCourses() {
    return this.client.send({ cmd: 'get-all-courses' }, {});
  }

  @Get(':id')
  async getCourse(@Param('id') id: string) {
    return this.client.send({ cmd: 'get-course' }, { id });
  }

  @Post()
  async createCourse(@Body() courseData: any) {
    return this.client.send({ cmd: 'create-course' }, courseData);
  }

  @Put(':id')
  async updateCourse(@Param('id') id: string, @Body() courseData: any) {
    return this.client.send({ cmd: 'update-course' }, { id, ...courseData });
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete-course' }, { id });
  }
}
