import { State } from 'src/user/pos/dto/enums';

export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  state: State;
}
