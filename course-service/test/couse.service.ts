import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from '../src/course/course.service';
import { CourseRepository } from '../src/course/course.repository';
import { RedisService } from '../src/redis/redis.service';
import { Course } from '../src/course/course.schema';

describe('CourseService', () => {
  let service: CourseService;
  let repository: CourseRepository;
  let redis: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: CourseRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get<CourseRepository>(CourseRepository);
    redis = module.get<RedisService>(RedisService);
  });

  it('should return all courses from cache', async () => {
    const courses: Course[] = [{ title: 'Test Course', price: 100, description: 'Test description' } as Course];
    jest.spyOn(redis, 'get').mockResolvedValue(JSON.stringify(courses));
    const result = await service.getAllCourses();
    expect(result).toEqual(courses);
    expect(repository.findAll).not.toHaveBeenCalled();
  });

  it('should return all courses from db if not cached', async () => {
    const courses: Course[] = [{ title: 'Test Course', price: 100, description: 'Test description' } as Course];
    jest.spyOn(redis, 'get').mockResolvedValue(null);
    jest.spyOn(repository, 'findAll').mockResolvedValue(courses);
    jest.spyOn(redis, 'set').mockResolvedValue();
    const result = await service.getAllCourses();
    expect(result).toEqual(courses);
    expect(redis.set).toHaveBeenCalledWith('courses', JSON.stringify(courses), 3600);
  });
});