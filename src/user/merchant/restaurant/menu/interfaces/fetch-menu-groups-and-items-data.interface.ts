import { IMenu } from './menu.interface';

export interface IFetchMenuGroupsAndItemsData {
  menuGroups: {
    id: string;
    name: string;
    menuItems: {
      id: string;
      name: string;
    }[];
  };
}
