import { State } from 'src/user/pos/dto/enums';
import { IToppingGroup } from './index';
import { IMenuItemTopping } from './menu-item-topping.interface';

export interface IToppingItem {
  id: string;
  group?: IToppingGroup;
  menuItemToppings: IMenuItemTopping[];
  name?: string;
  description?: string;
  price?: number;
  maxQuantity?: number;
  index?: number;
  isActive?: boolean;
  state: State;
}
