import { ApiProperty } from '@nestjs/swagger';
import { ICustomerAddressesData } from 'src/user/customer/interfaces';

export class GetListCustomerAddressResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Customer addresses fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: ICustomerAddressesData;
}
