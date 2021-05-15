import { IMenuGroup } from '.';

export interface IMenu {
  id: string;
  restaurantId: string;
  name: string;
  menuGroups?: IMenuGroup[];
}
