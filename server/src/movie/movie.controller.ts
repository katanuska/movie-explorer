import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('movie')
@Public()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }
}
