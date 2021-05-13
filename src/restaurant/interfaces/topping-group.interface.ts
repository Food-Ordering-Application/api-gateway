import { IToppingItem, IMenu } from './index';

export interface IToppingGroup {
  id: string;
  menu?: IMenu;
  toppingItems?: IToppingItem[];
  name?: string;
  index?: number;
  isActive?: boolean;
}
