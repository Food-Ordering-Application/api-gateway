import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IMenuItemData } from '../../interfaces/create-menu-item-data.interface';

export class CreateMenuItemResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Menu group created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      menuItem: {
        id: '54a800a3-81a4-44d9-a79e-456660724000',
        menuId: '148cd922-b73b-47d3-bada-facdf7b4ef54',
        menuGroupId: '148cd922-b73b-47d3-bada-facdf7b42354',
        name: 'Mì cay',
        description: 'Mì cay Hàn Quốc',
        price: 40000,
        imageUrl: 'http://lorempixel.com/640/480',
        index: POSITION_GAP,
        isActive: true,
      },
    },
  })
  data: IMenuItemData;
}
