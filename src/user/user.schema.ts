import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { UserRole } from './dto/create-user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  nickname: string;

  @Prop({ type: String, required: true })
  role: UserRole;

  @Prop({ type: [MongooseSchema.Types.ObjectId], required: true })
  playlists: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
