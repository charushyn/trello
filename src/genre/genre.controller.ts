import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Types } from 'mongoose';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../user/dto/create-user.dto';
import { RoleGuard } from '../common/guards/role/role.guard';
import { Public } from '../common/decorators/public.decorator';
import { UniquePipe } from './pipes/unique/unique.pipe';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Post()
  create(@Body(UniquePipe) createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.genreService.findOne(id);
  }

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.genreService.remove(id);
  }
}
