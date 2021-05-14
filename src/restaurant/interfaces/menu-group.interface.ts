import { IMenuItem } from './index';

export interface IMenuGroup {
  id: string;
  name: string;
  menuItems: IMenuItem[];
}
