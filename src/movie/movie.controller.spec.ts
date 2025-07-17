import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Types } from 'mongoose';
import { UpdateMovieDto } from './dto/update-movie.dto';

describe('MovieController', () => {
  let controller: MovieController;
  let createdMovieId: Types.ObjectId;
  const genreId = new Types.ObjectId();
  const directorId = new Types.ObjectId();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs-learning'),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
      ],
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST create user', async () => {
    const dto: CreateMovieDto = {
      title: 'some title',
      year: 2000,
      duration: 5,
      genre: genreId,
      directors: [directorId],
    };
    const createdUser = await controller.create(dto);

    expect(createdUser.title).toBe(dto.title);
    expect(createdUser.year).toBe(dto.year);

    createdMovieId = createdUser._id;
  });

  it('GET Find all movies', async () => {
    const users = await controller.findAll();

    expect(Array.isArray(users)).toBeTruthy();
  });

  it('GET should return created movie', async () => {
    const movie = await controller.findOne(createdMovieId);

    expect(movie?._id.toString()).toBe(createdMovieId.toString());
  });

  it('PATCH should update movie', async () => {
    const dto: UpdateMovieDto = {
      title: 'new title',
    };

    const updatedMovie = await controller.update(createdMovieId, dto);

    expect(updatedMovie?.title).toBe(dto.title);
  });

  it('DELETE should delete movie', async () => {
    const deletedMovie = await controller.remove(createdMovieId);
    expect(deletedMovie?._id.toString()).toBe(createdMovieId.toString());
  });
});
