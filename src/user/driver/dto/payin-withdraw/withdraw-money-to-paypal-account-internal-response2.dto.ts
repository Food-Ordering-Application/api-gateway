import { ApiProperty } from '@nestjs/swagger';

export class WithdrawMoneyToPaypalAccountInternalResponse2Dto {
  @ApiProperty({ example: 500 })
  statusCode: number;
  @ApiProperty({ example: 'Something went wrong', type: 'string' })
  message: string;
  @ApiProperty({ example: 'OUR_SYSTEM_BROKEN', type: 'string' })
  reason: string;
}
