import { Injectable, Logger } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import configuration from './../config/configuration';
import { PubMessagingService } from './pub-messaging.service';
import { IMessagingServiceCommand } from '@app/common/interfaces';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateExampleDate } from '@app/example/commands';
import { SUB_ROUTING_KEYS } from './routings';

export type RoutingKeysCommands = {
  [routingKey: string]: IMessagingServiceCommand;
};

@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);
  readonly commands: RoutingKeysCommands = {
    [SUB_ROUTING_KEYS.MS_CATS.UPDATED]: UpdateExampleDate,
  };

  constructor(
    private readonly commandBus: CommandBus,
    private readonly pubMessaging: PubMessagingService,
  ) {}

  @RabbitSubscribe({
    exchange: configuration.rabbitmq.exchange,
    routingKey: configuration.rabbitmq.routingKey,
    queue: configuration.rabbitmq.queue,
  })
  public async pubSubNew(msg: any, amqpMsg: ConsumeMessage) {
    let routingKey: string;
    try {
      routingKey = amqpMsg?.fields?.routingKey;
      this.logger.log(`[${routingKey}] ${JSON.stringify(msg)}`);

      if (routingKey in this.commands) {
        const command = await this.commands[routingKey].fromMessagingDto(msg);
        await this.commandBus.execute(command);
      } else {
        throw new Error('No handler found for this routing key');
      }
    } catch (error) {
      const errorMsg = {
        error: {
          routing_key: routingKey,
          message: error.message || error,
          payload: msg,
          error,
        },
      };
      this.pubMessaging.sendError(errorMsg);
      let errorMessage = `[${routingKey}] Error while processing message\n`;
      if (error.stack) {
        errorMessage += error.stack + '\n';
      } else {
        errorMessage += 'Error: ';
        if (error.message) {
          errorMessage += `${error.message}\n`;
          const errorJson = JSON.stringify(error, null, 3);
          if (errorJson !== '{}') {
            errorMessage += `${errorJson}\n`;
          }
        } else {
          errorMessage += `${JSON.stringify(error, null, 3)}\n`;
        }
      }

      errorMessage += `Payload: ${JSON.stringify(msg)}`;
      this.logger.error(errorMessage);
      return new Nack();
    }
  }

  @RabbitSubscribe({
    exchange: configuration.rabbitmq.exchange,
    routingKey: 'users.create',
    queue: 'users',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async pubSubUsers(msg: any, amqpMsg: ConsumeMessage) {
    console.log(`message of the  user queue: ${JSON.stringify(msg, null, 3)}`);
  }
}
