import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private movieModel: Model<UserDocument>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.movieModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.movieModel.find().lean().exec();
  }

  findOne(id: Types.ObjectId) {
    return this.movieModel.findById(id).lean().exec();
  }

  update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.movieModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .lean()
      .exec();
  }

  remove(id: Types.ObjectId) {
    return this.movieModel.findByIdAndDelete(id).lean().exec();
  }
}
