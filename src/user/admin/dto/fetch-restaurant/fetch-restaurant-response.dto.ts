import { ApiProperty } from '@nestjs/swagger';
import { IFetchRestaurantData } from '../../interfaces/';

export class FetchRestaurantProfilesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetched restaurants successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      results: [
        {
          restaurantId: 'fef41594-94b8-469e-82c9-ea8b244693b9',
          posAppKey: null,
          name: 'Quán Ăn Maika',
          phone: '0949657934',
          image: 'http://lorempixel.com/640/480',
          cityId: 5,
          city: 'Hồ Chí Minh',
          areaId: 143,
          area: 'Quận 5',
          address: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM',
          contractId: 1,
          isActive: true,
          isVerified: false,
          merchant: {
            id: 'f40b99fd-3224-449c-82a7-8e3ea514d535',
            username: 'merchant123',
            email: 'abc@gmail.com',
            phone: '0949654744',
            fullName: 'Nguyễn Văn Phúc',
            IDNumber: '272699300',
          },
        },
      ],
      size: 10,
      total: 1,
    },
    nullable: true,
  })
  data: IFetchRestaurantData;
}
