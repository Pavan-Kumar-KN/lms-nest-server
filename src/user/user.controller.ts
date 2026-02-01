import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { Request } from '@nestjs/common';
import { Payload } from 'src/auth/types/jwt.types';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getUser(@Request() req: { user: Payload }) {
    const { email } = req.user;

    return this.userService.getUser(email);
  }
}
