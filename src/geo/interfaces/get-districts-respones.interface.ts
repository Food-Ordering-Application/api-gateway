import { ICity } from './city.interface';
export interface IGetDistrictsResponse {
  status: number;
  message: string;
  data: {
    city: ICity;
  };
}
