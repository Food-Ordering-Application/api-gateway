import { ApiProperty } from '@nestjs/swagger';

export class WithdrawMoneyToPaypalAccountOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Withdraw successfully, please check your paypal account!',
    type: 'string',
  })
  message: string;
}
