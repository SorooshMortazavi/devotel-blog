import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/common/constants/UserRoles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndMerge<UserRoles[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]) || [];

    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || isPublic) {
      return true;
    }

    let isAllowed = false;

    roles.forEach(role => {
      if (context.switchToHttp().getRequest().user.role  === role) {
        isAllowed = true;
      }
    });

    return isAllowed;
  }
}
