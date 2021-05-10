import { POSITION_GAP } from '../../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import {
  IFetchMenuItemToppingsOfCurrentToppingItemData,
  IFetchToppingItemData,
} from '../../interfaces';

export class FetchMenuItemToppingsOfCurrentToppingItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetch successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      results: [
        '54a800a3-81a4-44d9-a79e-456660724000',
        '25a800a3-81a4-44d9-a79e-456660724000',
      ],
    },
    nullable: true,
  })
  data: IFetchMenuItemToppingsOfCurrentToppingItemData;
}
