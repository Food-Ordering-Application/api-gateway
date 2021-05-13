import { ApiProperty } from '@nestjs/swagger';
import { IFetchMenuGroupsAndItemsData } from '../../interfaces';

export class FetchMenuGroupsAndItemsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetch successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      menuId: '5360a64c-e887-4180-92be-7c0689a966d4',
      menuGroups: [
        {
          id: '9103f477-af37-4ec3-9ec1-90d604cdd744',
          name: 'Mì',
          menuItems: [
            {
              id: 'b060a64c-e887-4180-92be-7c0689a966d4',
              name: 'Mì cay',
            },
          ],
        },
      ],
    },
    nullable: true,
  })
  data: IFetchMenuGroupsAndItemsData;
}
