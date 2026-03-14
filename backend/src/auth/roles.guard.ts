import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user || !user.orgs || user.orgs.length === 0) {
      throw new ForbiddenException('Access denied: No role assigned.');
    }

    // For simplicity, we check the first organistion's role of the user
    // A more advanced implementaton would check the role for the specific org being accessed
    const userRole = user.orgs[0].role as Role;

    const hasRole = requiredRoles.includes(userRole);
    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied: Requires one of [${requiredRoles.join(', ')}]. Current role: ${userRole}.`,
      );
    }

    return true;
  }
}
