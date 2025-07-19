import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Request } from 'express';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../user/dto/create-user.dto';
import { RoleGuard } from '../common/guards/role/role.guard';
import { JwtCanBeUndefined } from '../common/decorators/allow-jwt-undefined.decorator';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @JwtCanBeUndefined()
  @Get()
  findAll(@Req() request: Request) {
    const { user } = request;
    return this.movieService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.movieService.findOne(id);
  }

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.movieService.remove(id);
  }
}
