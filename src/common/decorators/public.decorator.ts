import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../guards/jwt/jwt.guard';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
