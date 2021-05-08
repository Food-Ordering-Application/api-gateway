import { ApiProperty } from '@nestjs/swagger';

export class DeleteCustomerAddressResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: 'Customer address deleted successfully',
    type: 'string',
  })
  message: string;
}
