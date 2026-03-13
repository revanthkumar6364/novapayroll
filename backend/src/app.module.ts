import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrgModule } from './org/org.module';
import { EmployeeModule } from './employee/employee.module';
import { PayrollModule } from './payroll/payroll.module';
import { PayoutModule } from './payout/payout.module';
import { TenantModule } from './tenant/tenant.module';
import { TenantMiddleware } from './tenant/tenant.middleware';

import { OtpModule } from './auth/otp/otp.module';
import { MailModule } from './mail/mail.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import { ComplianceModule } from './compliance/compliance.module';
import { BotModule } from './bot/bot.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { ForexModule } from './forex/forex.module';
import { VendorModule } from './vendor/vendor.module';
import { ReimbursementModule } from './reimbursement/reimbursement.module';
import { InviteModule } from './invite/invite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    /* 
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    */
    TenantModule,
    PrismaModule,
    AuthModule,
    OrgModule,
    EmployeeModule,
    PayrollModule,
    PayoutModule,
    OtpModule,
    MailModule,
    NotificationsModule,
    ComplianceModule,
    BotModule,
    SandboxModule,
    ForexModule,
    VendorModule,
    ReimbursementModule,
    InviteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
