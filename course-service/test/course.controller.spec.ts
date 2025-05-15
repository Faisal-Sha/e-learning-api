import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('CourseController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /courses should create a course', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send({ title: 'Test Course', description: 'Test', price: 100 })
      .expect(201)
      .expect(res => {
        expect(res.body.title).toEqual('Test Course');
        expect(res.body.price).toEqual(100);
      });
  });

  it('POST /courses should return 400 for invalid input', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send({ description: 'Test', price: 'invalid' })
      .expect(400);
  });
});