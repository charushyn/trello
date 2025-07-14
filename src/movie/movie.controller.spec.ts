// import { Test, TestingModule } from '@nestjs/testing';
// import { MovieController } from './movie.controller';
// import { MovieService } from './movie.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Movie, MovieSchema } from './movie.schema';
// import { CreateMovieDto } from './dto/create-movie.dto';
// import { Types } from 'mongoose';
// import { UpdateMovieDto } from './dto/update-movie.dto';

// describe('MovieController', () => {
//   let controller: MovieController;
//   let createdMovieId: Types.ObjectId;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         MongooseModule.forRoot('mongodb://localhost:27017/nestjs-learning'),
//         MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
//       ],
//       controllers: [MovieController],
//       providers: [MovieService],
//     }).compile();

//     controller = module.get<MovieController>(MovieController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('POST create user', async () => {
//     const dto: CreateMovieDto = {
//       title: 'some title',
//       year: 2000,
//     };
//     const createdUser = await controller.create(dto);

//     expect(createdUser.title).toBe(dto.title);
//     expect(createdUser.year).toBe(dto.year);

//     createdMovieId = createdUser._id;
//   });

//   it('GET Find all movies', async () => {
//     const users = await controller.findAll();

//     expect(Array.isArray(users)).toBeTruthy();
//   });

//   it('GET should return created user', async () => {
//     const user = await controller.findOne(createdMovieId);

//     expect(user?._id.toString()).toBe(createdMovieId.toString());
//   });

//   it('PATCH should update user', async () => {
//     const dto: UpdateMovieDto = {
//       email: 'email@gmail.com',
//     };

//     const updatedUser = await controller.update(createdMovieId, dto);

//     expect(updatedUser?.email).toBe(dto.email);
//   });

//   it('DELETE should delete user', async () => {
//     const deletedUser = await controller.remove(createdMovieId);
//     expect(deletedUser?._id.toString()).toBe(createdMovieId.toString());
//   });
// });
