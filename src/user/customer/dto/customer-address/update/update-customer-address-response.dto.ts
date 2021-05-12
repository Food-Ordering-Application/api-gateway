import { ApiProperty } from '@nestjs/swagger';
import { ICustomerAddressData } from '../../../interfaces/index';

export class UpdateCustomerAddressResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Customer fetched successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      customerAddress: {
        address: '484 Sư Vạn Hạnh, phường 9, Quận 10, Thành phố Hồ Chí Minh',
        geom: {
          type: 'Point',
          coordinates: [10.7669222, 106.6708678],
        },
        default: true,
        customer: {
          id: 'da552594-d925-4311-ab2f-303d26abdae1',
        },
        id: '2db97de5-fbd5-4104-9031-acf67bdf7997',
        city: 'TPHCM',
        area: 'TPHCM',
      },
    },
    nullable: true,
  })
  data: ICustomerAddressData;
}
