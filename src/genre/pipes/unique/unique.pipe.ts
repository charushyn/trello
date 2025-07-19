import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from '../../genre.schema';
import { Model } from 'mongoose';
import { CreateGenreDto } from '../../dto/create-genre.dto';

@Injectable()
export class UniquePipe implements PipeTransform {
  constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}

  async transform(value: CreateGenreDto, metadata: ArgumentMetadata) {
    const exist = await this.genreModel
      .findOne({ name: value.name })
      .lean()
      .exec();

    if (exist !== null) {
      throw new ConflictException('Genre with that name already exist');
    }

    return value;
  }
}
