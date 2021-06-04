import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class WithdrawMoneyToPaypalAccountForbiddenResponse1Dto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({
    example: 'Cannot withdraw money because main wallet does not exceed 300k',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: 'MINIMUM_MAIN_ACCOUNT_AMOUNT_REQUIRED_NOT_EXCEEDED',
    type: 'string',
  })
  reason: string;
}
