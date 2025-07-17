import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../user/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stategy';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService, ConfigService, UserService],
})
export class AuthModule {}
