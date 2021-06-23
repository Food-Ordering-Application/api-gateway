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
    example: {
      customerAddresses: [
        {
          id: '2db97de5-fbd5-4104-9031-acf67bdf7997',
          address: '484 Sư Vạn Hạnh, phường 9, Quận 10, Thành phố Hồ Chí Minh',
          city: 'TPHCM',
          area: 'TPHCM',
          geom: {
            type: 'Point',
            coordinates: [10.7669222, 106.6708678],
          },
          default: true,
        },
      ],
    },
    nullable: true,
  })
  data: ICustomerAddressesData;
}
