import { OrderItem } from '../dto';

export class CreateOrderPayload {
  orderItem: OrderItem;
  customer?: {
    customerId?: string;
    customerAddress: string;
    customerGeom?: { type: string; coordinates: number[] };
    customerName: string;
    customerPhoneNumber: string;
  };
  restaurant: {
    restaurantId: string;
    restaurantGeom?: { type: string; coordinates: number[] };
    restaurantAddress: string;
    restaurantName: string;
    restaurantPhoneNumber: string;
  };
  cashierId?: string;
}
