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
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Types } from 'mongoose';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../user/dto/create-user.dto';
import { RoleGuard } from '../common/guards/role/role.guard';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.directorService.findOne(id);
  }

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.update(id, updateDirectorDto);
  }

  @Roles([UserRole.ADMIN])
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.directorService.remove(id);
  }
}
