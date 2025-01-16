import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  findAll() {
    return `This action returns all movie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }
}
