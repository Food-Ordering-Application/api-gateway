import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../enums';

export class ConfirmOrderCheckoutDto {
  @ApiProperty({
    example: 'Xin dùm em thêm giá, hành',
    required: false,
  })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({
    example: PaymentMethod.PAYPAL,
    enum: PaymentMethod,
    required: true,
  })
  @IsString()
  paymentMethod: string;

  @ApiProperty({
    example: '6P4DS2J5E5HL8',
    required: false,
  })
  @IsString()
  @IsOptional()
  paypalMerchantId: string;
}
