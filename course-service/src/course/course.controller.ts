import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('courses')
@ApiTags('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all courses', operationId: 'getAllCourses' })
  @ApiResponse({ status: 200, type: [CreateCourseDto] })
  async getAllCourses(): Promise<CreateCourseDto[]> {
    return await this.courseService.getAllCourses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID', operationId: 'getCourseById' })
  @ApiParam({ name: 'id', type: String, description: 'Course ID' })
  @ApiResponse({ status: 200, type: CreateCourseDto })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseById(@Param('id') id: string): Promise<CreateCourseDto> {
    return await this.courseService.getCourseById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new course', operationId: 'createCourse' })
  @ApiResponse({ status: 201, type: CreateCourseDto })
  async createCourse(@Body() dto: CreateCourseDto): Promise<CreateCourseDto> {
    return await this.courseService.createCourse(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a course', operationId: 'updateCourse' })
  @ApiParam({ name: 'id', type: String, description: 'Course ID' })
  @ApiResponse({ status: 200, type: CreateCourseDto })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async updateCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto
  ): Promise<CreateCourseDto> {
    return await this.courseService.updateCourse(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a course', operationId: 'deleteCourse' })
  @ApiParam({ name: 'id', type: String, description: 'Course ID' })
  @ApiResponse({ status: 204, description: 'Course deleted' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async deleteCourse(@Param('id') id: string): Promise<void> {
    await this.courseService.deleteCourse(id);
  }
}