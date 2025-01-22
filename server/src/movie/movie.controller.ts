import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { MovieDetailsDto } from './dto/movie-details.dto';
import { MovieDto } from './dto/movie.dto';

@Controller('movie')
@Public()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(@Query('title') title?: string): Promise<MovieDto[]> {
    return this.movieService.findAll(title);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieDetailsDto> {
    return this.movieService.findOne(id);
  }
}
