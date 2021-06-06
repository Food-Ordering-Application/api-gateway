import { ApiProperty } from '@nestjs/swagger';
import { IAccountWalletData } from '../../interfaces';

export class GetMainAccountWalletBalanceOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Main account balance fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      accountWallet: {
        id: '0ed17767-556b-4d14-a7d7-54ecc428c67a',
        mainBalance: 500000,
        depositBalance: 2000000,
      },
    },
    type: 'string',
  })
  data: IAccountWalletData;
}
