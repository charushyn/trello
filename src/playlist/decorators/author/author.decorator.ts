import { SetMetadata } from '@nestjs/common';

export const AUTHOR_DECORATOR_KEY = 'author';

export const Author = () => SetMetadata(AUTHOR_DECORATOR_KEY, true);
