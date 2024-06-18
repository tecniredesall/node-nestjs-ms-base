import { CacheService } from '@app/cache/cache.service';
import { FilterPaginationQuery } from '@app/common/middleware/req-filterpaginate.middleware';
import { CacheStoreModule } from '@app/common/modules/cache/cache-store.module';
import { PubMessagingService } from '@app/messaging/pub-messaging.service';
import { OTPNotification } from '@app/notifications/example/otp.notification';
import { MsformsValidatorService } from '@app/validations/msforms-validator.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { ExampleMongoRepository } from './repositories/example.mongo.repository';
import { ExampleMemoryRepository } from './repositories/memory.repository';

jest.mock('./example.service');
jest.mock('@app/messaging/pub-messaging.service');

describe('ExampleController', () => {
  let controller: ExampleController;
  let service: ExampleService;
  let filters: FilterPaginationQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheStoreModule],
      controllers: [ExampleController],
      providers: [
        PubMessagingService,
        OTPNotification,
        ExampleService,
        CacheService,
        {
          provide: ExampleMongoRepository,
          useClass: ExampleMemoryRepository,
        },
        {
          provide: MsformsValidatorService,
          useValue: {
            validatePayload: async () => Promise.resolve(false),
          },
        },
      ],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
    service = module.get<ExampleService>(ExampleService);
  });

  describe('filterPagination', () => {
    beforeEach(() => {
      filters = new FilterPaginationQuery({
        mongoQueryString: '{}',
        sort: {},
        limit: 10,
        page: 1,
        fields: '',
      });

      jest.spyOn(service, 'findPaginate');

      jest.clearAllMocks();
    });

    it('should call example service', async () => {
      await controller.filterPagination(filters);

      expect(service.findPaginate).toBeCalledTimes(1);
      expect(service.findPaginate).toHaveBeenCalledWith(filters);
    });
  });
});
