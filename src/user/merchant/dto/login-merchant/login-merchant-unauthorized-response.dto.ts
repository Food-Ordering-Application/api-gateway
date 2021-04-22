import { ApiProperty } from '@nestjs/swagger';

export class LoginMerchantUnauthorizedResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
}
