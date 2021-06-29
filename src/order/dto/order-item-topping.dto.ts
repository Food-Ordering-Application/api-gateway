import { IsNumber, IsString, IsUUID } from 'class-validator';

export class OrderItemTopping {
  @IsUUID()
  toppingItemId?: string;

  @IsNumber()
  quantity?: number;
}
