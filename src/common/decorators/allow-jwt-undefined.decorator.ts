import { SetMetadata } from '@nestjs/common';

export const IS_JWT_CAN_RETURN_UNDEFINED = 'isJwtCanReturnUndefined';

export const JwtCanBeUndefined = () =>
  SetMetadata(IS_JWT_CAN_RETURN_UNDEFINED, true);
