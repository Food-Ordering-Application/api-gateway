import { IsNumber, IsString } from 'class-validator';

export class OrderItemTopping {
  @IsString()
  toppingItemId?: string;

  @IsNumber()
  quantity?: number;
}
