import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from './actor.entity';

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

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @ManyToMany(() => Actor)
  @JoinTable()
  actors: Actor[];
}
