import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './genre.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Types } from 'mongoose';
import { UpdateGenreDto } from './dto/update-genre.dto';

describe('GenreController', () => {
  let controller: GenreController;
  let createdGenreId: Types.ObjectId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs-learning'),
        MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
      ],
      controllers: [GenreController],
      providers: [GenreService],
    }).compile();

    controller = module.get<GenreController>(GenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST create genre', async () => {
    const dto: CreateGenreDto = {
      name: 'new name genre',
    };
    const createdGenre = await controller.create(dto);

    expect(createdGenre.name).toBe(dto.name);

    createdGenreId = createdGenre._id;
  });

  it('GET Find all genres', async () => {
    const users = await controller.findAll();

    expect(Array.isArray(users)).toBeTruthy();
  });

  it('GET should return created genre', async () => {
    const genre = await controller.findOne(createdGenreId);

    expect(genre?._id.toString()).toBe(createdGenreId.toString());
  });

  it('PATCH should update genre', async () => {
    const dto: UpdateGenreDto = {
      name: 'new name',
    };

    const updatedGenre = await controller.update(createdGenreId, dto);

    expect(updatedGenre?.name).toBe(dto.name);
  });

  it('DELETE should delete genre', async () => {
    const deletedGenre = await controller.remove(createdGenreId);
    expect(deletedGenre?._id.toString()).toBe(createdGenreId.toString());
  });
});
