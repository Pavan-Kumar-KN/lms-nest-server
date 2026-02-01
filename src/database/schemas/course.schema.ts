import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  courseUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  instructor: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  students?: User[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
