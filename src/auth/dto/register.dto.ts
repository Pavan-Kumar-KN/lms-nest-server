import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from 'src/user/types/user.type';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
