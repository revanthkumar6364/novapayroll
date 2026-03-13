import { Module } from '@nestjs/common';
import { SalaryRevisionService } from './salary-revision.service';
import { SalaryRevisionController } from './salary-revision.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SalaryRevisionService],
  controllers: [SalaryRevisionController],
  exports: [SalaryRevisionService],
})
export class SalaryRevisionModule {}
