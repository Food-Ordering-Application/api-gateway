import { State } from './../enums';
export class PosOrderItemToppingDto {
  id?: string;
  toppingItemId: string;
  name: string;
  quantity: number;
  price: number;
  state: State;
}
