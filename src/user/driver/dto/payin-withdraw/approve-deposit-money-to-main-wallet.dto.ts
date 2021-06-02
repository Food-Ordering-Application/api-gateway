import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApproveDepositMoneyIntoMainAccountWalletDto {
  @ApiProperty({
    example: '5O190127TN364715T',
    required: true,
  })
  @IsString()
  paypalOrderId: string;
}
