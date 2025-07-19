import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { UniqueEmailPipe } from './pipes/unique-email.pipe';
import { IsObjectIdPipe } from './pipes/isObjectId.pipe';
import { Request } from 'express';
import { RoleGuard } from '../common/guards/role/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body(UniqueEmailPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @UseGuards(Roles)
  findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  me(@Req() req: Request) {
    const { user } = req;
    
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
