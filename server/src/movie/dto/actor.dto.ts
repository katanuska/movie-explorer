import { Expose } from 'class-transformer';

export class ActorDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  imageUrl: string;

  @Expose()
  character: string;
}
