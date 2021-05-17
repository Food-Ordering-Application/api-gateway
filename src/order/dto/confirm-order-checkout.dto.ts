import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaymentType } from '../enums';

export class ConfirmOrderCheckoutDto {
  @ApiProperty({
    example: 'Xin dùm em thêm giá, hành',
    required: false,
  })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({
    example: PaymentType.PAYPAL,
    enum: PaymentType,
    required: true,
  })
  @IsString()
  paymentType: string;
}