import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const token = this.authService.generateToken(createUserDto.email);
    const createdUser = new this.userModel(createUserDto);
    return { data: createdUser.save(), token };
  }

  findAll() {
    return this.userModel.find().lean().exec();
  }

  findOne(id: Types.ObjectId) {
    return this.userModel.findById(id).lean().exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email }).lean().exec();
  }

  update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .lean()
      .exec();
  }

  remove(id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id).lean().exec();
  }
}
