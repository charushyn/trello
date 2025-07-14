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
    const users = this.movieModel.find().lean().exec();
    return users;
  }

  findOne(id: Types.ObjectId) {
    const user = this.movieModel.findById(id).lean().exec();
    return user;
  }

  update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    const updatedUser = this.movieModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .lean()
      .exec();
    return updatedUser;
  }

  remove(id: Types.ObjectId) {
    const deletedUser = this.movieModel.findByIdAndDelete(id).lean().exec();
    return deletedUser;
  }
}
