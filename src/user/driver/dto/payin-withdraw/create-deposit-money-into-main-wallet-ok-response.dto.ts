import { ApiProperty } from '@nestjs/swagger';
import { ICreateDepositMoneyIntoMainAccountWalletData } from '../../interfaces';

export class DepositMoneyIntoMainAccountWalletOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Deposit money successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: ICreateDepositMoneyIntoMainAccountWalletData;
}
