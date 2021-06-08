import { ApiProperty } from '@nestjs/swagger';
import { IMainBalanceData } from '../../interfaces';

export class ApproveDepositMoneyIntoMainAccountWalletOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Approve paypal order successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      mainBalance: 699000,
    },
  })
  data: IMainBalanceData;
}
