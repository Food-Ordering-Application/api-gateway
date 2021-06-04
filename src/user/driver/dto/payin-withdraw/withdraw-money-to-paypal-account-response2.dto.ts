import { ApiProperty } from '@nestjs/swagger';

export class WithdrawMoneyToPaypalAccountForbiddenResponse2Dto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({
    example:
      'Cannot withdraw money because main wallet does not have enough money',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: 'INSUFFICIENT_AMOUNT_IN_MAIN_ACCOUNT',
    type: 'string',
  })
  reason: string;
}
