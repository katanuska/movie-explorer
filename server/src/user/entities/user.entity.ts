import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  favorites: Favorite[];
}
