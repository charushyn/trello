import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { DirectorModule } from './director/director.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards/jwt/jwt.guard';
import { PlaylistModule } from './playlist/playlist.module';
import { MailModule } from './mail/mail.module';

const globalGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // <--- Обов'язково імпортуємо ConfigModule сюди
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // <--- Використовуємо MONGO_URI
      }),
      inject: [ConfigService], // <--- Вказуємо залежність від ConfigService
    }),
    MovieModule,
    DirectorModule,
    GenreModule,
    UserModule,
    AuthModule,
    PassportModule,
    PlaylistModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, globalGuard],
})
export class AppModule {}
