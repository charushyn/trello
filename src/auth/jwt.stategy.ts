import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
  ) {
    const jwt_secret = configService.get<string>('JWT_SECRET');
    if (typeof jwt_secret === 'undefined') {
      throw new Error('AUTH SERVICE ENV ERROR');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwt_secret,
      ignoreExpiration: true,
    });
  }

  async validate(payload: { email: string }) {
    const { email } = payload;

    const user = await this.userService.findByEmail(email);
    if (user === null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
