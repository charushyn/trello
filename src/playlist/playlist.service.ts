import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './playlist.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}

  create(createPlaylistDto: CreatePlaylistDto) {
    const playlist = new this.playlistModel(createPlaylistDto);
    return playlist.save();
  }

  findAll() {
    return this.playlistModel.find().lean().exec();
  }

  findOne(id: Types.ObjectId) {
    return this.playlistModel.findById(id).populate('author').lean().exec();
  }

  update(id: Types.ObjectId, updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistModel
      .findByIdAndUpdate(id, updatePlaylistDto, { new: true })
      .lean()
      .exec();
  }

  remove(id: Types.ObjectId) {
    return this.playlistModel
      .findByIdAndDelete(id, { new: true })
      .lean()
      .exec();
  }
}
