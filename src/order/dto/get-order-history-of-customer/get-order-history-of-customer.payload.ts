import { OrderHistoryFilter } from 'src/order/enums';

export class GetOrderHistoryOfCustomerPayload {
  customerId: string;
  offset: number;
  limit: number;
  filter: OrderHistoryFilter;
  from: string;
  to: string;
}
