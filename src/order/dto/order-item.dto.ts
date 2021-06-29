import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemTopping } from './order-item-topping.dto';

export class OrderItem {
  @IsUUID()
  menuItemId?: string;

  @IsNumber()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @ValidateNested({ each: true })
  @Type(() => OrderItemTopping)
  orderItemToppings?: OrderItemTopping[];
}
