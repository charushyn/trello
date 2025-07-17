import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  IsString,
  IsMongoId,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  genre: Types.ObjectId;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  directors: Types.ObjectId[];
}
