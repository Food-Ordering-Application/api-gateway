import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsNumber,
  IsDateString,
  IsEnum,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { OrdStatus, PType } from '../enums';
import { PosOrderItemDto } from './pos-order-item.dto';

export class PosOrderDto {
  @IsUUID()
  id?: string;

  @IsUUID()
  cashierId: string;

  @IsUUID()
  restaurantId: string;

  @IsNumber()
  @IsOptional()
  itemDiscount: number;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  subTotal: number;

  @IsNumber()
  grandTotal: number;

  @IsString()
  @IsOptional()
  note: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsEnum(PType)
  paymentType: PType;

  @IsEnum(OrdStatus)
  status: OrdStatus;

  @ValidateNested({ each: true })
  @Type(() => PosOrderItemDto)
  orderItems: PosOrderItemDto[];
}
