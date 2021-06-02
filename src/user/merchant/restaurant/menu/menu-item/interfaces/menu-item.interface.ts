import { State } from 'src/user/pos/dto/enums';

export class IMenuItem {
  id: string;
  menuId: string;
  menuGroupId: string;
  description: string;
  price: number;
  imageUrl: string;
  index: number;
  isActive: boolean;
  state: State;
}
