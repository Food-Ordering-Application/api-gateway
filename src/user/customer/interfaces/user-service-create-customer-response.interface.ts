import { IUser } from './user.interface';

export interface IUserServiceCreateResponse {
  status: number;
  message: string;
  user: IUser | null;
  // errors: { [key: string]: any };
}
