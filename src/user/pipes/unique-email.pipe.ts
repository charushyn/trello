import { Injectable, PipeTransform } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async transform(value: CreateUserDto) {
    const exists = await this.userModel
      .findOne({ email: value.email })
      .lean()
      .exec();
    if (exists) {
      throw new BadRequestException('Email is already taken');
    }
    return value;
  }
}
