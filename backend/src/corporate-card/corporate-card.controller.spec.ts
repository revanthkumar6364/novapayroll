import { Test, TestingModule } from '@nestjs/testing';
import { CorporateCardController } from './corporate-card.controller';

describe('CorporateCardController', () => {
  let controller: CorporateCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporateCardController],
    }).compile();

    controller = module.get<CorporateCardController>(CorporateCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
