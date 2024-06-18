import { toMongoObjectId } from '@app/common/utils/StringConverter';
import { plainToInstance, Transform } from 'class-transformer';
import { IsDefined, IsString, validateOrReject } from 'class-validator';
import { Types } from 'mongoose';

export interface CatUpdatedDto {
  _id: string;
  name: string;
  example_id: string;
}

export class UpdateExampleDate {
  @Transform(toMongoObjectId)
  @IsDefined()
  readonly catId: Types.ObjectId;

  @IsString()
  readonly catName: string;

  @Transform(toMongoObjectId)
  @IsDefined()
  readonly exampleId: Types.ObjectId;

  constructor(
    catId: Types.ObjectId,
    catName: string,
    exampleId: Types.ObjectId,
  ) {
    this.catId = catId;
    this.catName = catName;
    this.exampleId = exampleId;
  }

  static async fromMessagingDto(
    payload: CatUpdatedDto,
  ): Promise<UpdateExampleDate> {
    const result = plainToInstance(UpdateExampleDate, {
      catId: payload._id,
      catName: payload.name,
      exampleId: payload.example_id,
    });
    await validateOrReject(result);
    return result;
  }
}
