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
    const createdUser = await controller.create(dto);

    expect(createdUser.email).toBe(dto.email);
    expect(createdUser.nickname).toBe(dto.nickname);

    createdGenreId = createdUser._id;
  });

  it('GET Find all users', async () => {
    const users = await controller.findAll();

    expect(Array.isArray(users)).toBeTruthy();
  });

  it('GET should return created user', async () => {
    const user = await controller.findOne(createdGenreId);

    expect(user?._id.toString()).toBe(createdGenreId.toString());
  });

  it('PATCH should update user', async () => {
    const dto: UpdateGenreDto = {
      email: 'email@gmail.com',
    };

    const updatedUser = await controller.update(createdGenreId, dto);

    expect(updatedUser?.email).toBe(dto.email);
  });

  it('DELETE should delete user', async () => {
    const deletedUser = await controller.remove(createdGenreId);
    expect(deletedUser?._id.toString()).toBe(createdGenreId.toString());
  });
});
