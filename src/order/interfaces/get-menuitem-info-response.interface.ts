import { IMenuItemData } from './index';

export interface IGetMenuItemInfoResponse {
  status: number;
  message: string;
  data: IMenuItemData | null;
}
