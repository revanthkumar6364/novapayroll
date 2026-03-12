import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class TenantService {
  private static readonly storage = new AsyncLocalStorage<string>();

  setTenantId(orgId: string) {
    return TenantService.storage.enterWith(orgId);
  }

  getTenantId(): string | undefined {
    return TenantService.storage.getStore();
  }

  runWithTenant(orgId: string, callback: () => any) {
    return TenantService.storage.run(orgId, callback);
  }
}
