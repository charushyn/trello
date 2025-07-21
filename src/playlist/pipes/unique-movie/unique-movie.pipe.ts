import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from '../../playlist.schema';
import { Model } from 'mongoose';
import { UpdatePlaylistDto } from '../../dto/update-playlist.dto';

@Injectable()
export class UniqueMoviePipe implements PipeTransform {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}

  async transform(value: UpdatePlaylistDto, metadata: ArgumentMetadata) {
    const exist_movie_in_playlist = await this.playlistModel
      .findOne({ movies: value.movies })
      .lean()
      .exec();

    if (exist_movie_in_playlist !== null) {
      throw new ConflictException();
    }
    return value;
  }
}
