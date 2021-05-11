import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import {
  IFetchMenuItemToppingsOfCurrentToppingItemData,
  IFetchToppingItemData,
} from '../../interfaces';

export class FetchMenuItemToppingsOfCurrentToppingItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetched menu item toppings of topping item successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      toppingItemId: '7b1f3536-8e93-4555-b52b-be471c6b3b96',
      results: [
        {
          menuItemId: 'e82c236b-f27e-4e09-b089-9542674e4ea7',
          customPrice: null,
        },
        {
          menuItemId: '749bae27-4f9d-4504-a951-23fd5418bf6f',
          customPrice: 3000,
        },
      ],
    },
    nullable: true,
  })
  data: IFetchMenuItemToppingsOfCurrentToppingItemData;
}
