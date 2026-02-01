import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/database/schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      return await this.courseModel.create({
        name: createCourseDto.name,
        description: createCourseDto.description,
        duration: createCourseDto.duration,
        level: createCourseDto.level,
        price: createCourseDto.price,
        courseUrl: createCourseDto.courseUrl,
        instructor: createCourseDto.instructor,
      });
    } catch {}
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: string) {
    return `This action returns a #${id} course`;
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: string) {
    return `This action removes a #${id} course`;
  }
}
