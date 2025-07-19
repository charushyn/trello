import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { Model, Types } from 'mongoose';
import { UserDocument } from '../user/user.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  findAll(user: any) {
    const movie_query = this.movieModel.find();

    if (!user) {
      movie_query.select('title');
    }
    return movie_query.lean().exec();
  }

  findOne(id: Types.ObjectId) {
    return this.movieModel
      .findById(id)
      .populate('directors')
      .populate('genre')
      .lean()
      .exec();
  }

  update(id: Types.ObjectId, updateMovieDto: UpdateMovieDto) {
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .populate('directors')
      .populate('genre')
      .lean()
      .exec();
  }

  remove(id: Types.ObjectId) {
    return this.movieModel.findByIdAndDelete(id, { new: true }).lean().exec();
  }
}
