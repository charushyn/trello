import { UserDocument } from '../../user/user.schema';

declare namespace Express {
  export interface Request {
    user: UserDocument;
  }
}
