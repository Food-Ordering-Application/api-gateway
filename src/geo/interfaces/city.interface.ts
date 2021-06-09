import { IArea } from '.';

export class ICity {
  id: number;
  name: string;
  districts?: IArea[];
}
