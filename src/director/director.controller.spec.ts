import { Test, TestingModule } from '@nestjs/testing';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './director.schema';
import { Types } from 'mongoose';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

describe('DirectorController', () => {
  let controller: DirectorController;
  let createdDirectorId: Types.ObjectId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs-learning'),
        MongooseModule.forFeature([
          { name: Director.name, schema: DirectorSchema },
        ]),
      ],
      controllers: [DirectorController],
      providers: [DirectorService],
    }).compile();

    controller = module.get<DirectorController>(DirectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST create director', async () => {
    const dto: CreateDirectorDto = {
      name: 'new name director',
      DOB: new Date(),
    };
    const createdDirector = await controller.create(dto);

    expect(createdDirector.name).toBe(dto.name);
    expect(createdDirector.DOB).toBe(dto.DOB);

    createdDirectorId = createdDirector._id;
  });

  it('GET Find all directors', async () => {
    const directors = await controller.findAll();

    expect(Array.isArray(directors)).toBeTruthy();
  });

  it('GET should return created director', async () => {
    const director = await controller.findOne(createdDirectorId);

    expect(director?._id.toString()).toBe(createdDirectorId.toString());
  });

  it('PATCH should update director', async () => {
    const dto: UpdateDirectorDto = {
      name: 'new name',
    };

    const updatedDirector = await controller.update(createdDirectorId, dto);

    expect(updatedDirector?.name).toBe(dto.name);
  });

  it('DELETE should delete director', async () => {
    const deletedDirector = await controller.remove(createdDirectorId);
    expect(deletedDirector?._id.toString()).toBe(createdDirectorId.toString());
  });
});
