import { ICommand } from '@nestjs/cqrs';

export type IMessagingServiceCommand<T extends ICommand = ICommand> = {
  new (...args: any[]): T;
  fromMessagingDto: (...args: any[]) => Promise<T>;
};
