import { ApiProperty } from '@nestjs/swagger';
import { Director } from '../../director/director.schema';
import { Genre } from '../../genre/genre.schema';

export class CreateMovieDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  genre: Genre;
  @ApiProperty()
  directors: Array<Director>;
}
