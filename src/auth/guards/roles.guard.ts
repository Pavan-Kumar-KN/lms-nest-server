import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from 'src/user/types/user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private relector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.relector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // ['admin']
    return requiredRoles.some((role) => user.role === role);
  }
}
