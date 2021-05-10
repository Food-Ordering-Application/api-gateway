import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class PickCustomerAddressResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Customer addresses picked successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IOrderData;
}
