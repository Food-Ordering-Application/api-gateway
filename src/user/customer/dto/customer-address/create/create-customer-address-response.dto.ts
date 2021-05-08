import { ApiProperty } from '@nestjs/swagger';
import { ICustomerAddressData } from '../../../interfaces/index';

export class CreateCustomerAddressResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Customer fetched successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      customerAddress: {
        address:
          '2581/13 Huỳnh Tấn Phát, Phú Xuân, Nhà Bè, Thành phố Hồ Chí Minh',
        geom: {
          type: 'Point',
          coordinates: [10.6796076, 106.7497249],
        },
        customer: {
          id: 'cb40c29c-d932-4053-871b-73ba0134f1dc',
        },
        id: '1206ed93-5960-4b8b-b608-55752c76e2c3',
        city: 'TPHCM',
        area: 'TPHCM',
      },
    },
    nullable: true,
  })
  data: ICustomerAddressData;
}
