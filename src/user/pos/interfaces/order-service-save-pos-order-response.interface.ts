import { ISavePosOrderData } from '.';

export interface IOrderServiceSavePosOrderResponse {
  status: number;
  message: string;
  data: ISavePosOrderData;
}
