import { SetMetadata } from '@nestjs/common';

export const IS_VISIBILITY_CHECK = 'visibility';

export const Visibility = () => SetMetadata(IS_VISIBILITY_CHECK, true);
