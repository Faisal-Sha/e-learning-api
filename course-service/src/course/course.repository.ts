import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';

@Injectable()
export class CourseRepository {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findById(id: string): Promise<Course | null> {
    return this.courseModel.findById(id).exec();
  }

  async create(course: Partial<Course>): Promise<Course> {
    return this.courseModel.create(course);
  }

  async update(id: string, course: Partial<Course>): Promise<Course | null> {
    return this.courseModel.findByIdAndUpdate(id, course, { new: true }).exec();
  }

  async delete(id: string): Promise<Course | null> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
}