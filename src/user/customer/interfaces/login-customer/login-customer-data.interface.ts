import { ICustomer } from '../customer.interface';

export interface ILoginCustomerData {
  user: ICustomer;
  access_token: string;
}
