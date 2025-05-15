import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Course title',
    example: 'Introduction to NestJS'
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @ApiProperty({
    description: 'Course description',
    required: false,
    example: 'Learn the basics of NestJS framework'
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Course price',
    example: 99.99,
    minimum: 0
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  readonly price: number;
}

export class UpdateCourseDto {
  @ApiProperty({
    description: 'Course title',
    required: false,
    example: 'Advanced NestJS'
  })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  readonly title?: string;

  @ApiProperty({
    description: 'Course description',
    required: false,
    example: 'Deep dive into NestJS features'
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Course price',
    required: false,
    example: 149.99,
    minimum: 0
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsOptional()
  readonly price?: number;
}