import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'node:fs/promises';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param registerDto
   * @returns
   *
   * 1. check if email exists or not
   * 2. hash password
   * 3. create user
   * 4. generate token
   * 5. return token
   */
  async signup(registerDto: RegisterDto) {
    const user = await this.userService.createUser(registerDto);
    if (!user) {
      throw new Error('User creation failed');
    }

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  /**
   *
   * @param loginDto
   * @returns
   */
  async login(loginDto: LoginDto) {
    const user = await this.userService.getUser(loginDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
