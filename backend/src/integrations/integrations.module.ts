import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IntegrationService],
  controllers: [IntegrationController],
  exports: [IntegrationService],
})
export class IntegrationsModule {}
