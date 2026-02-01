import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/database/schemas/course.schema';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
  
export class CourseModule {}
