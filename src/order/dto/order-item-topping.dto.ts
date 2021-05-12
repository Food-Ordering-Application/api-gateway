import { IsNumber, IsString } from 'class-validator';

export class OrderItemTopping {
  @IsString()
  menuItemToppingId?: string;

  @IsNumber()
  quantity?: number;

  @IsString()
  name?: string;

  @IsNumber()
  price?: number;
}
