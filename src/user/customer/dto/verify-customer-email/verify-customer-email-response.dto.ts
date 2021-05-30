import { ApiProperty } from '@nestjs/swagger';

export class VerifyCustomerEmailResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Verify customer email successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: 'thachdau16t@gmail.com',
    type: 'string',
  })
  email: string;
}
