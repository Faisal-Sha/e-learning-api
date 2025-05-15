import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly redisService: RedisService,
  ) {}

  async getAllCourses(): Promise<any[]> {
    const cacheKey = 'courses';
    const cached = await this.redisService.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const courses = await this.courseRepository.findAll();
    await this.redisService.set(cacheKey, JSON.stringify(courses), 3600);
    return courses;
  }

  async getCourseById(id: string): Promise<any> {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async createCourse(dto: CreateCourseDto): Promise<any> {
    return this.courseRepository.create(dto);
  }

  async updateCourse(id: string, dto: UpdateCourseDto): Promise<any> {
    const course = await this.courseRepository.update(id, dto);
    if (!course) throw new NotFoundException('Course not found');
    await this.redisService.del('courses');
    return course;
  }

  async deleteCourse(id: string): Promise<any> {
    const course = await this.courseRepository.delete(id);
    if (!course) throw new NotFoundException('Course not found');
    await this.redisService.del('courses');
    return course;
  }
}