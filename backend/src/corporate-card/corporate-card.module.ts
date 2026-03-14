import { Module } from '@nestjs/common';
import { CorporateCardService } from './corporate-card.service';
import { CorporateCardController } from './corporate-card.controller';

@Module({
  providers: [CorporateCardService],
  controllers: [CorporateCardController]
})
export class CorporateCardModule {}
