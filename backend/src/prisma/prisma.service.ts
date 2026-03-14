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

            const typedArgs = args as {
              where?: Record<string, any>;
              data?: Record<string, any> | any[];
            };

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
                typedArgs.where = {
                  ...typedArgs.where,
                  orgId: tenantId,
                };
              }
              if (['create', 'createMany'].includes(operation)) {
                // Inject orgId into data
                if (operation === 'create') {
                  typedArgs.data = {
                    ...(typedArgs.data as Record<string, any>),
                    orgId: tenantId,
                  };
                } else if (Array.isArray(typedArgs.data)) {
                  typedArgs.data = typedArgs.data.map((item) => ({
                    ...item,
                    orgId: tenantId,
                  }));
                }
              }
            }

            return query(args) as Promise<any>;
          },
        },
      },
    });
  }
}
