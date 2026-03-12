import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantService: TenantService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const orgId = req.headers['x-org-id'] as string;

    if (!orgId) {
      // For public routes, we might not have an orgId.
      // But for tenant-scoped ones, we should validate later in a guard.
      return next();
    }

    this.tenantService.runWithTenant(orgId, () => next());
  }
}
