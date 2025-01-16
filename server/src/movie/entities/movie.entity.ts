import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseYear: number;

  @Column()
  genre: string;

  @Column()
  runtime: number;

  @Column()
  language: string;

  @Column()
  posterUrl: string;

  @Column()
  rating: number;
}
