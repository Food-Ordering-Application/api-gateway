import { IActorInformationForOrderData } from '.';

export interface IGetOrderActorInfoResponse {
  status: number;
  message: string;
  data: IActorInformationForOrderData;
}
