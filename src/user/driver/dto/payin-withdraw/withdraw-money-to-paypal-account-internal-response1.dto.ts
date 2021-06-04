import { ApiProperty } from '@nestjs/swagger';

export class WithdrawMoneyToPaypalAccountInternalResponse1Dto {
  @ApiProperty({ example: 500 })
  statusCode: number;
  @ApiProperty({ example: 'Withdraw failed', type: 'string' })
  message: string;
  @ApiProperty({ example: 'PAYPAL_BROKEN', type: 'string' })
  reason: string;
}
