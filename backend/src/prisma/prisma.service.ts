import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly tenantService: TenantService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  get extendedClient() {
    const tenantId = this.tenantService.getTenantId();

    return this.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            // Models that require multi-tenant isolation
            const tenantModels = [
              'Org',
              'Employee',
              'SalaryComponent',
              'AttendancePeriod',
              'PayrollRun',
              'PayoutBatch',
              'ComplianceMonth',
              'AuditEvent',
              'Wallet',
              'WalletTransaction',
              'CorporateCard',
              'Vendor',
              'VendorPayment',
              'VendorPayoutBatch',
            ];

            if (tenantModels.includes(model) && tenantId) {
              if (
                [
                  'findFirst',
                  'findMany',
                  'count',
                  'update',
                  'updateMany',
                  'delete',
                  'deleteMany',
                ].includes(operation)
              ) {
                // Inject orgId into where clause
                (args as any).where = {
                  ...(args as any).where,
                  orgId: tenantId,
                };
              }
              if (['create', 'createMany'].includes(operation)) {
                // Inject orgId into data
                if (operation === 'create') {
                  (args as any).data = {
                    ...(args as any).data,
                    orgId: tenantId,
                  };
                } else {
                  (args as any).data = ((args as any).data as any[]).map(
                    (item) => ({
                      ...item,
                      orgId: tenantId,
                    }),
                  );
                }
              }
            }

            return query(args);
          },
        },
      },
    });
  }
}
