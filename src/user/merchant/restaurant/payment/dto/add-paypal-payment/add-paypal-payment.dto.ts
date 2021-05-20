import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddPaypalPaymentDto {
  @ApiProperty({
    example: 'DD64LQSRDC2UN',
    required: true,
    description: 'Id account paypal của restaurant',
  })
  @IsString()
  merchantIdInPayPal: string;
}
