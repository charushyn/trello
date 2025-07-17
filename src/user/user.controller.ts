import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { Public } from '../common/decorators/public.decorator';
import { UniqueEmailPipe } from './pipes/unique-email.pipe';
import { IsObjectIdPipe } from './pipes/isObjectId.pipe';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body(UniqueEmailPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  me(@Req() req: Request) {
    const { user } = req;
    console.log(req.user);
    return user;
  }

  @Public()
  @Get(':id')
  findOne(@Param() params: IsObjectIdPipe) {
    return this.userService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.userService.remove(id);
  }
}
