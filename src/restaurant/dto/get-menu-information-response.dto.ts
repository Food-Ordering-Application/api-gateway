import { ApiProperty } from '@nestjs/swagger';
import { IGetMenuAndMenuGroupsAndMenuItemsData } from '../interfaces';

export class GetMenuInformationResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetched menu information successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      menu: {
        id: '7bd1efce-d873-43b0-9412-14335dbe3b47',
        restaurantId: 'fef41594-94b8-469e-82c9-ea8b244693b9',
        name: 'Thực đơn',
        menuGroups: [
          {
            id: '2e8af62c-b32c-4eda-bdaa-4cde6e3564a8',
            name: 'Mì 2',
            menuItems: [
              {
                id: 'e82c236b-f27e-4e09-b089-9542674e4ea7',
                name: 'Mì cay',
                description: 'Mì cay Hàn Quốc',
                price: 40000,
                imageUrl: 'http://lorempixel.com/640/480',
              },
              {
                id: '749bae27-4f9d-4504-a951-23fd5418bf6f',
                name: 'Mì cay',
                description: 'Mì cay Hàn Quốc',
                price: 40000,
                imageUrl: 'http://lorempixel.com/640/480',
              },
            ],
          },
        ],
      },
    },
    nullable: true,
  })
  data: IGetMenuAndMenuGroupsAndMenuItemsData;
}
