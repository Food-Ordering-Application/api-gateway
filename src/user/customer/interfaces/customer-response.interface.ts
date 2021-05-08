import { ICustomer } from './customer.interface';

export interface IUserServiceResponse {
  status: number;
  message: string;
  user: ICustomer | null;
  // errors: { [key: string]: any };
}
