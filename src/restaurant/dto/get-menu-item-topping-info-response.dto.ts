import { ApiProperty } from '@nestjs/swagger';
import { State } from 'src/user/pos/dto/enums';
import { IGetMenuItemToppingsData } from '../interfaces';

export class GetMenuItemToppingInfoResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'MenuItemTopping fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      toppingGroups: [
        {
          id: '6d6403dc-297f-48f4-a17e-3c290bc697dd',
          name: 'Kenneth Doyle',
          toppingItems: [
            {
              id: 'af184e4e-c6f4-4117-946e-1cc5ff10e1d8',
              name: 'Alison Satterfield',
              description:
                'Provident expedita beatae sunt porro consequatur aut.',
              price: 11673,
              maxQuantity: 3,
              state: State.IN_STOCK,
            },
            {
              id: 'c0225a9a-19b1-4574-8496-0f9a52b41814',
              name: 'Thalia Reichel III',
              description:
                'Quisquam voluptatem distinctio odio vero veritatis repellat ut nemo aut.',
              price: 6956,
              maxQuantity: 3,
              state: State.IN_STOCK,
            },
            {
              id: 'c508d9c7-8d06-46fb-9c00-a8856368bfca',
              name: 'Mertie Sipes',
              description:
                'Et quia quasi rem sint non nesciunt voluptatem non est.',
              price: 16427,
              maxQuantity: 3,
              state: State.IN_STOCK,
            },
          ],
        },
      ],
    },
    nullable: true,
  })
  data: IGetMenuItemToppingsData;
}
