import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Test, TestingModule } from '@nestjs/testing';
import { PubMessagingService } from './pub-messaging.service';

jest.mock('@golevelup/nestjs-rabbitmq');

describe('PubMessagingService', () => {
  let service: PubMessagingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PubMessagingService, AmqpConnection],
    }).compile();

    service = module.get<PubMessagingService>(PubMessagingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
