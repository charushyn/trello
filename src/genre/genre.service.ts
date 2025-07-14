import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from './genre.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    const createdGenre = new this.genreModel(createGenreDto);
    return createdGenre.save();
  }

  findAll() {
    return this.genreModel.find().lean().exec();
  }

  findOne(id: Types.ObjectId) {
    return this.genreModel.findById(id).lean().exec();
  }

  update(id: Types.ObjectId, updateGenreDto: UpdateGenreDto) {
    return this.genreModel
      .findByIdAndUpdate(id, updateGenreDto, { new: true })
      .lean()
      .exec();
  }

  remove(id: Types.ObjectId) {
    return this.genreModel.findByIdAndDelete(id).lean().exec();
  }
}
