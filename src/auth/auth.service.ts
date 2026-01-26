import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
  signup(registerDto: RegisterDto) {
    const user = this.userService.createUser();
    if (!user) {
      throw new Error('User creation failed');
    }
    console.log(user);
    return registerDto;
  }

  login() {
    return 'Login  sucessfull';
  }
}
