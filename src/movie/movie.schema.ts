import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Genre } from '../genre/genre.schema';
import { Director } from '../director/director.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Genre', required: true })
  genre: Types.ObjectId | Genre;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Director',
    required: true,
  })
  directors: Types.ObjectId[] | Director[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
