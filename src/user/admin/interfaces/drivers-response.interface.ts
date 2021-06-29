import { IDriver } from '../../driver/interfaces';

export interface IDriversResponse {
  status: number;
  message: string;
  drivers: IDriver[];
}
