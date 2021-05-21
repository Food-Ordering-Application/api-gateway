import { ApiProperty } from '@nestjs/swagger';
import { ICustomerIdData } from '../../interfaces';

export class GetCustomerResetPasswordTokenResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get customer reset password token successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: ICustomerIdData;
}
