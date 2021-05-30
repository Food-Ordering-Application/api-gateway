import { IDriver } from './driver.interface';

export interface IDriverResponse {
  status: number;
  message: string;
  driver: IDriver | null;
}
