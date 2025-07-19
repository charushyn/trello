import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PlaylistService } from '../../playlist.service';
import { IS_VISIBILITY_CHECK } from '../../decorators/visibility/visibility.decorator';
import { IS_PUBLIC_KEY } from '../../../common/guards/jwt/jwt.guard';
import { AUTHOR_DECORATOR_KEY } from '../../decorators/author/author.decorator';

@Injectable()
export class VisibilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private playlistService: PlaylistService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isVisibilityCheck: boolean = this.reflector.get(
      IS_VISIBILITY_CHECK,
      context.getHandler(),
    );

    const isAccessOnlyAuthor: boolean = this.reflector.get(
      AUTHOR_DECORATOR_KEY,
      context.getHandler(),
    );

    if (!isVisibilityCheck && !isAccessOnlyAuthor) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { id } = request.params;

    const requested_playlist = await this.playlistService.findOne(id);

    if (requested_playlist === null) {
      throw new NotFoundException();
    }

    const visibility_status = requested_playlist.visibility;

    if (visibility_status === 'Public' && !isAccessOnlyAuthor) {
      return true;
    }

    const isAuthor =
      requested_playlist?.author._id.toString() === user?._id.toString();
    
    if (isAuthor) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
