import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerPasswordResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Reset customer password successfully',
    type: 'string',
  })
  message: string;
}
