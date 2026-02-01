import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsString()
  level: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  courseUrl: string;

  // Assuming instructorId will be provided as a string (ObjectId)
  @IsString()
  @IsMongoId()
  instructor: string;

  // Optional: If you allow setting initial students during creation
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @Type(() => String)
  students?: string[];
}
