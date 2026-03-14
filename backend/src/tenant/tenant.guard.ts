import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    const orgId = request.headers['x-org-id'] as string;

    if (!orgId) {
      throw new UnauthorizedException('X-Org-ID header is missing');
    }

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const membership = await this.prisma.orgMembership.findUnique({
      where: {
        userId_orgId: {
          userId: user.id,
          orgId: orgId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('You do not belong to this organization');
    }

    return true;
  }
}
