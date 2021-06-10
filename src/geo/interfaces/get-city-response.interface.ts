import { ICity } from '.';

export interface IGetCityResponse {
  status: number;
  message: string;
  data: {
    city: ICity;
  };
}
