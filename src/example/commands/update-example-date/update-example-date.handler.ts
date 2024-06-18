import { ExampleMongoRepository } from '@app/example/repositories/example.mongo.repository';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ObjectID from 'bson-objectid';
import { UpdateExampleDate } from './update-example-date.command';

@CommandHandler(UpdateExampleDate)
export class UpdateExampleDateHandler
  implements ICommandHandler<UpdateExampleDate>
{
  private readonly logger = new Logger(UpdateExampleDateHandler.name);

  constructor(private readonly repository: ExampleMongoRepository) {}

  async execute({ exampleId }: UpdateExampleDate) {
    const _id = ObjectID(exampleId.toString());
    const example = await this.repository.findById(_id);
    if (!example) {
      throw new Error(`Example ${_id} not found`);
    }

    example.updated_at = new Date();

    await this.repository.findByIdAndUpdate(_id, example);
    this.logger.log(`Example ${_id} date updated successfully`);
  }
}
