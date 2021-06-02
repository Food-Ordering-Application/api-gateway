import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class WithdrawMoneyToPaypalAccountDto {
  @ApiProperty({
    example: 200000,
    required: true,
  })
  @IsNumber()
  moneyToWithdraw: number;
}
