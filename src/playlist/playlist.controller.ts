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
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Types } from 'mongoose';
import { Author } from './decorators/author/author.decorator';
import { Visibility } from './decorators/visibility/visibility.decorator';
import { VisibilityGuard } from './guards/visibility/visibility.guard';
import { JwtCanBeUndefined } from '../common/decorators/allow-jwt-undefined.decorator';
import { UniqueMoviePipe } from './pipes/unique-movie/unique-movie.pipe';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Visibility()
  @JwtCanBeUndefined()
  @UseGuards(VisibilityGuard)
  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.playlistService.findOne(id);
  }

  @Author()
  @UseGuards(VisibilityGuard)
  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.playlistService.remove(id);
  }
}
