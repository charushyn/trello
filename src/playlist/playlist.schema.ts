import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import { VisibilityStatus } from './dto/create-playlist.dto';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Movie', required: true })
  movies: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ type: String, required: true })
  visibility: VisibilityStatus;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
