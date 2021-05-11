import { IMenuItemToppingOfToppingItem } from '.';

export interface IFetchMenuItemToppingsOfCurrentToppingItemData {
  toppingItemId: string;
  results: IMenuItemToppingOfToppingItem[];
}
