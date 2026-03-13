import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ForexService } from './forex.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('forex')
export class ForexController {
  constructor(private readonly forexService: ForexService) {}

  @Get('rates')
  async getRates(@Query('base') base: string) {
    return this.forexService.getLatestRates(base || 'INR');
  }

  @Get('convert')
  async convert(
    @Query('amount') amount: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const result = await this.forexService.convert(Number(amount), from, to);
    return {
      amount,
      from,
      to,
      result,
      timestamp: new Date(),
    };
  }
}
