import { IMenu } from './index';
import { IMenuGroup } from './menu-group.interface';

export interface IMenuInformationResponse {
  status: number;
  message: string;
  data: {
    menu: IMenu;
  };
}
