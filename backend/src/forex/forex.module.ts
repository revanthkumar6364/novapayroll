import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ForexService } from './forex.service';
import { ForexController } from './forex.controller';

@Module({
  imports: [HttpModule],
  providers: [ForexService],
  controllers: [ForexController],
  exports: [ForexService],
})
export class ForexModule {}
