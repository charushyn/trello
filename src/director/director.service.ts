import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Director, DirectorDocument } from './director.schema';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<DirectorDocument>,
  ) {}

  create(createDirectorDto: CreateDirectorDto) {
    const createdDirector = new this.directorModel(createDirectorDto);
    return createdDirector.save();
  }

  findAll() {
    return this.directorModel.find().lean().exec();
  }

  findOne(id: Types.ObjectId) {
    return this.directorModel.findById(id).lean().exec();
  }

  update(id: Types.ObjectId, updateDirectorDto: UpdateDirectorDto) {
    return this.directorModel
      .findByIdAndUpdate(id, updateDirectorDto, {
        new: true,
      })
      .lean()
      .exec();
  }

  remove(id: Types.ObjectId) {
    return this.directorModel
      .findByIdAndDelete(id, { new: true })
      .lean()
      .exec();
  }
}
