import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface RateMap {
  [key: string]: number;
}

interface ExchangeRateResponse {
  rates: RateMap;
}

@Injectable()
export class ForexService {
  private readonly logger = new Logger(ForexService.name);
  private cache: { rates: RateMap; timestamp: number } | null = null;
  private readonly CACHE_TTL = 3600000; // 1 hour

  constructor(private readonly httpService: HttpService) {}

  async getLatestRates(base = 'INR') {
    const now = Date.now();
    if (this.cache && now - this.cache.timestamp < this.CACHE_TTL) {
      this.logger.log('Returning rates from cache');
      return this.cache.rates;
    }

    try {
      this.logger.log(`Fetching latest rates for ${base}...`);
      const response = await firstValueFrom(
        this.httpService.get<ExchangeRateResponse>(
          `https://api.exchangerate-api.com/v4/latest/${base}`,
        ),
      );
      const data = response.data;

      this.cache = {
        rates: data.rates,
        timestamp: now,
      };

      return data.rates;
    } catch (error: any) {
      this.logger.error(
        'Failed to fetch exchange rates',
        (error as Error).stack,
      );
      // Fallback rates if API is down
      return {
        USD: 0.012,
        EUR: 0.011,
        GBP: 0.0094,
        INR: 1,
      };
    }
  }

  async convert(amount: number, from: string, to: string) {
    const rates = await this.getLatestRates(from);
    const rate = rates[to];
    if (!rate) throw new Error(`Rate not found for ${to}`);
    return amount * rate;
  }
}
