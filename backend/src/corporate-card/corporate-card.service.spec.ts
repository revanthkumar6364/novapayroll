import { Test, TestingModule } from '@nestjs/testing';
import { CorporateCardService } from './corporate-card.service';

describe('CorporateCardService', () => {
  let service: CorporateCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorporateCardService],
    }).compile();

    service = module.get<CorporateCardService>(CorporateCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
