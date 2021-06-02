import { ApiProperty } from '@nestjs/swagger';

export class ApproveDepositMoneyIntoMainAccountWalletOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Approve paypal order successfully',
    type: 'string',
  })
  message: string;
}
