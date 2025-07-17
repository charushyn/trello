import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateToken(email: string) {
    const secret: string | undefined = this.configService.get('JWT_SECRET');

    if (typeof secret === 'undefined') {
      throw new Error('AUTH ENV ERROR');
    }
    return this.jwtService.sign({ email }, { secret });
  }
}
