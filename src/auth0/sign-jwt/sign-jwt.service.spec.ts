import { Test, TestingModule } from '@nestjs/testing';
import { SignJwtService } from './sign-jwt.service';

describe('SignJwtService', () => {
  let service: SignJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignJwtService],
    }).compile();

    service = module.get<SignJwtService>(SignJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
