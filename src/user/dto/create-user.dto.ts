// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsIn,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
    format: 'email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The unique nickname of the user',
    example: 'AwesomeUser123',
    minLength: 3,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3) // Optional: Minimum length for the nickname
  @MaxLength(20) // Optional: Maximum length for the nickname
  nickname: string;

  @ApiProperty({
    description: 'Role: Admin or User',
    example: 'Admin',
  })
  @IsNotEmpty()
  @IsIn(['Admin', 'User'], {
    message: 'Available roles: Admin, User',
  })
  role: UserRole;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  playlists: Types.ObjectId[];
}
