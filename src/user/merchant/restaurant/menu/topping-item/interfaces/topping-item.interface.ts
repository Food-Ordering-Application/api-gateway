import { State } from 'src/user/pos/dto/enums';

export class IToppingItem {
  id: string;
  menuId: string;
  toppingGroupId: string;
  description: string;
  price: number;
  maxQuantity: number;
  index: number;
  state: State;
  isActive: boolean;
}
