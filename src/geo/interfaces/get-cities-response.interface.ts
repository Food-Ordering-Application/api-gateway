import { ICity } from '.';

export interface IGetCitiesResponse {
  status: number;
  message: string;
  data: {
    cities: ICity[];
  };
}
