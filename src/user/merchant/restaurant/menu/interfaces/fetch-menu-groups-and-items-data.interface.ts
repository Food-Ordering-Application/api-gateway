import { IMenu } from './menu.interface';

export interface IFetchMenuGroupsAndItemsData {
  menu: {
    menuId: string;
    menuGroups: {
      id: string;
      name: string;
      menuItems: {
        id: string;
        name: string;
      }[];
    }[];
  };
}
