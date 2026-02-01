import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ERROR_CODE, SALT_ROUND } from './constants/constant';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userData: RegisterDto): Promise<UserDocument> {
    try {
      const hashPassword = bcrypt.hashSync(userData.password, SALT_ROUND);

      return await this.userModel.create({
        email: userData.email,
        password: hashPassword,
        createdAt: new Date(),
      });
    } catch (err: any) {
      if (err.code === ERROR_CODE.DUPLICATE_KEY_CODE) {
        throw new ConflictException('Already email is registered ');
      }

      throw err;
    }
  }

  async getUser(email: string) {
    return await this.userModel.findOne({ email: email });
  }
}
