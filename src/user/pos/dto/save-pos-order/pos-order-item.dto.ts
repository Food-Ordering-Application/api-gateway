import { Type } from 'class-transformer';
import {
  IsUUID,
  IsEnum,
  IsNumber,
  ValidateNested,
  IsString,
  IsOptional,
} from 'class-validator';
import { State } from '../enums';
import { PosOrderItemToppingDto } from './pos-order-item-topping.dto';

export class PosOrderItemDto {
  @IsUUID()
  id?: string;

  @IsUUID()
  menuItemId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  subTotal: number;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsEnum(State)
  state: State;

  @ValidateNested()
  @Type(() => PosOrderItemToppingDto)
  orderItemToppings: PosOrderItemToppingDto[];
}
