import { IAddressAndMenuItemData } from './index';

export interface IGetAddressAndMenuItemResponse {
  status: number;
  message: string;
  data: IAddressAndMenuItemData | null;
}
