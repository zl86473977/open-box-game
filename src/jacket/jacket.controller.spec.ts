import { Test, TestingModule } from '@nestjs/testing';
import { JacketController } from './jacket.controller';

describe('JacketController', () => {
  let controller: JacketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JacketController],
    }).compile();

    controller = module.get<JacketController>(JacketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
