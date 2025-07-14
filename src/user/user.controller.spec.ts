import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let createdUserId: Types.ObjectId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs-learning'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST create user', async () => {
    const dto: CreateUserDto = {
      email: 'some@gmail.com',
      nickname: 'nickname',
    };
    const createdUser = await controller.create(dto);

    expect(createdUser.email).toBe(dto.email);
    expect(createdUser.nickname).toBe(dto.nickname);

    createdUserId = createdUser._id;
  });

  it('GET Find all users', async () => {
    const users = await controller.findAll();

    expect(Array.isArray(users)).toBeTruthy();
  });

  it('GET should return created user', async () => {
    const user = await controller.findOne(createdUserId);

    expect(user?._id.toString()).toBe(createdUserId.toString());
  });

  it('PATCH should update user', async () => {
    const dto: UpdateUserDto = {
      email: 'email@gmail.com',
    };

    const updatedUser = await controller.update(createdUserId, dto);

    expect(updatedUser?.email).toBe(dto.email);
  });

  it('DELETE should delete user', async () => {
    const deletedUser = await controller.remove(createdUserId);
    expect(deletedUser?._id.toString()).toBe(createdUserId.toString());
  });
});
