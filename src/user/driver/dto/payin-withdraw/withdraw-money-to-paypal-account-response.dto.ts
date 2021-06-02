import { ApiProperty } from '@nestjs/swagger';

export class WithdrawMoneyToPaypalAccountOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Withdraw to paypal account successfully',
    type: 'string',
  })
  message: string;
}
