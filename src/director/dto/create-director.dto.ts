import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateDirectorDto {
  @ApiProperty({
    description: 'The full name of the director',
    example: 'Christopher Nolan',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The date of birth of the director (ISO 8601 string)',
    example: '1970-07-30', // YYYY-MM-DD
    format: 'date', // Hint for Swagger UI
  })
  @IsNotEmpty()
  @IsDateString() // Validates that the string is a valid date string (e.g., '1970-07-30')
  DOB: string; // Keep as string for incoming body, ValidationPipe will handle transformation if needed
}
