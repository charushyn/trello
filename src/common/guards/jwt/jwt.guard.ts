import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_VISIBILITY_CHECK } from '../../../playlist/decorators/visibility/visibility.decorator';
import { UserDocument } from '../../../user/user.schema';
import { IS_JWT_CAN_RETURN_UNDEFINED } from '../../decorators/allow-jwt-undefined.decorator';

export const IS_PUBLIC_KEY = 'isPublic';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic: boolean = this.reflector.get(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const isJwtCanBeUndefined: boolean = this.reflector.get(
      IS_JWT_CAN_RETURN_UNDEFINED,
      context.getHandler(),
    );

    if (isJwtCanBeUndefined) {
      return user;
    }

    if (err || !user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
