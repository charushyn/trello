import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class IsObjectIdPipe {
  @IsMongoId()
  id: Types.ObjectId;
}
