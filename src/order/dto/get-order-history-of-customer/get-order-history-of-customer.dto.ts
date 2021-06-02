import { OrderHistoryFilter } from 'src/order/enums';

export class GetOrderHistoryOfCustomerDto {
  customerId: string;
  offset: number;
  limit: number;
  filter: OrderHistoryFilter;
  from: Date;
  to: Date;
}
