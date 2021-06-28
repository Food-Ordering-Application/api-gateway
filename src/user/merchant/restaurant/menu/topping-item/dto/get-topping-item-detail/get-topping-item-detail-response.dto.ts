import { ApiProperty } from '@nestjs/swagger';
import { POSITION_GAP } from 'src/constants';
import { State } from 'src/user/pos/dto/enums';

export class GetToppingItemDetailResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetch successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      toppingItem: {
        id: '54a800a3-81a4-44d9-a79e-456660724000',
        menuId: '148cd922-b73b-47d3-bada-facdf7b4ef54',
        toppingGroupId: '148cd922-b73b-47d3-bada-facdf7b42354',
        name: 'Nước sốt Hàn Quốc',
        description: 'Nước sốt Hàn Quốc vị cay',
        price: 9000,
        maxQuantity: 2,
        index: POSITION_GAP,
        state: State.IN_STOCK,
        isActive: true,
      },
    },
    nullable: true,
  })
  data: any;
}
