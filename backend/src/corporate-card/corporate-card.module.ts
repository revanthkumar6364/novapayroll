import { Module } from '@nestjs/common';
import { CorporateCardService } from './corporate-card.service';
import { CorporateCardController } from './corporate-card.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [CorporateCardService],
  controllers: [CorporateCardController],
  imports: [PrismaModule],
})
export class CorporateCardModule {}
