import { Module } from '@nestjs/common';
import { FinalSettlementService } from './final-settlement.service';
import { FinalSettlementController } from './final-settlement.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FinalSettlementService],
  controllers: [FinalSettlementController],
  exports: [FinalSettlementService],
})
export class FinalSettlementModule {}
