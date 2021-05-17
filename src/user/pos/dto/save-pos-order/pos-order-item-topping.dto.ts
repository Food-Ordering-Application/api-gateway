import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { State } from './../enums';
export class PosOrderItemToppingDto {
  @IsUUID()
  id?: string;

  @IsUUID()
  toppingItemId: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  state: State;
}
