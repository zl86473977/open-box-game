import { Test, TestingModule } from '@nestjs/testing';
import { JacketService } from './jacket.service';

describe('JacketService', () => {
  let service: JacketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JacketService],
    }).compile();

    service = module.get<JacketService>(JacketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
