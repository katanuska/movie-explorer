import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { Movie } from './movie/entities/movie.entity';
import { SeedService } from './config/seed.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt.config';
import { FavoritesModule } from './favorite/favorite.module';
import { Actor } from './movie/entities/actor.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig, jwtConfig] }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([Movie, Actor]),
    MovieModule,
    UserModule,
    AuthModule,
    FavoritesModule,
  ],
  providers: [AppService, SeedService],
})
export class AppModule {}
