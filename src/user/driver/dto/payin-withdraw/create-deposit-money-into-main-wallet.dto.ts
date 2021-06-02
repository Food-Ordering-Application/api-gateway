import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DepositMoneyIntoMainAccountWalletDto {
  @ApiProperty({ example: '200000', uniqueItems: true, required: true })
  @IsNumber()
  moneyToDeposit: number;
}
