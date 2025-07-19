import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { DirectorModule } from './director/director.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards/jwt/jwt.guard';
import { PlaylistModule } from './playlist/playlist.module';

const globalGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-learning'),
    MovieModule,
    DirectorModule,
    GenreModule,
    UserModule,
    AuthModule,
    PassportModule,
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService, globalGuard],
})
export class AppModule {}
