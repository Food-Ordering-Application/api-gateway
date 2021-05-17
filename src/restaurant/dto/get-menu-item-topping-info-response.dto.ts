import { ApiProperty } from '@nestjs/swagger';
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
            },
            {
              id: 'c0225a9a-19b1-4574-8496-0f9a52b41814',
              name: 'Thalia Reichel III',
              description:
                'Quisquam voluptatem distinctio odio vero veritatis repellat ut nemo aut.',
              price: 6956,
              maxQuantity: 3,
            },
            {
              id: 'c508d9c7-8d06-46fb-9c00-a8856368bfca',
              name: 'Mertie Sipes',
              description:
                'Et quia quasi rem sint non nesciunt voluptatem non est.',
              price: 16427,
              maxQuantity: 3,
            },
          ],
        },
        {
          id: '5fa98e03-ec9e-4a2c-8195-68b9db13b08c',
          name: 'Orland Hickle',
          toppingItems: [
            {
              id: '9d5c9c80-440d-4885-b9ef-bdb15aca75a0',
              name: 'Roberta Pacocha',
              description: 'Totam quidem nulla recusandae.',
              price: 8171,
              maxQuantity: 3,
            },
            {
              id: '5a11addb-01e5-4260-b627-3699bec9fd22',
              name: 'Maryam Orn',
              description:
                'Numquam iusto quidem nesciunt ad atque facere eos qui.',
              price: 8618,
              maxQuantity: 3,
            },
            {
              id: 'f68224a5-3e57-49b9-9baf-3cd2476c5645',
              name: 'Henderson Dickinson',
              description:
                'Quasi non porro cum rerum numquam assumenda totam nihil voluptas.',
              price: 6561,
              maxQuantity: 3,
            },
          ],
        },
      ],
    },
    nullable: true,
  })
  data: IGetMenuItemToppingsData;
}
