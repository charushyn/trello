import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export type VisibilityStatus = 'Public' | 'Private';

export class CreatePlaylistDto {
  @ApiProperty({
    description: 'Name of playlist',
    example: 'My favourite playlist',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'Mongoose ObjectId Array that reference to movies ObjectId each',
  })
  @IsNotEmpty()
  @IsMongoId({ each: true })
  movies: Types.ObjectId[];

  @ApiProperty({
    description: 'Mongoose ObjectId that reference to user ObjectId',
  })
  @IsNotEmpty()
  @IsMongoId()
  author: Types.ObjectId;

  @ApiProperty({
    description: 'Is playlist visible to others?',
    example: 'Public || Private',
  })
  @IsNotEmpty()
  @IsIn(['Public', 'Private'], {
    message: 'Public or Private has to be set in visibility Prop',
  })
  visibility: VisibilityStatus;
}
