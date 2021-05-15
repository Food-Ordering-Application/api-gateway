import { ApiProperty } from '@nestjs/swagger';
import { IGetMenuItemToppingsData } from '../interfaces';

export class GetToppingInfoOfAMenuResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Toppings fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      toppingGroups: [
        {
          id: '8197f7db-a0e0-4305-8fe8-fc628b57be9f',
          menuId: '8fd77c64-6e9a-4fa1-b859-ff1aab08e1a5',
          name: 'Violette Simonis',
          isActive: true,
          index: 1,
          deletedAt: null,
          toppingItems: [
            {
              id: '56b3b4e4-7a6b-4025-a668-5d21e55d09de',
              menuId: '8fd77c64-6e9a-4fa1-b859-ff1aab08e1a5',
              toppingGroupId: '8197f7db-a0e0-4305-8fe8-fc628b57be9f',
              name: 'Lilian Hackett',
              description:
                'Molestiae voluptatem et doloribus aperiam pariatur at tempore.',
              price: 38708,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              deletedAt: null,
              menuItemToppings: [
                {
                  id: '55b2df6e-c6ab-4e0e-ab84-6baff7294a3a',
                  customPrice: 5619,
                  deletedAt: null,
                },
                {
                  id: '16dd9a03-dc73-4ea1-b879-b27cd2ab7ccd',
                  customPrice: 18276,
                  deletedAt: null,
                },
                {
                  id: '662c3601-662e-4513-8c06-fbdf68c6a3f3',
                  customPrice: 8753,
                  deletedAt: null,
                },
                {
                  id: '420b99e7-d312-4210-9d5f-ae0fc2d38867',
                  customPrice: 9141,
                  deletedAt: null,
                },
                {
                  id: '2cc102ce-7499-45ad-a97e-d4eddd7faf0e',
                  customPrice: 18392,
                  deletedAt: null,
                },
                {
                  id: '2703239f-07c5-400d-b0af-27c3a70d47bc',
                  customPrice: 13012,
                  deletedAt: null,
                },
              ],
            },
            {
              id: 'e188d08a-79e3-4f66-af08-22774c9d64fa',
              menuId: '8fd77c64-6e9a-4fa1-b859-ff1aab08e1a5',
              toppingGroupId: '8197f7db-a0e0-4305-8fe8-fc628b57be9f',
              name: 'Nels Purdy V',
              description: 'Id est dicta quis alias eos sunt est.',
              price: 50495,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              deletedAt: null,
              menuItemToppings: [
                {
                  id: 'e5fbd374-55da-47d0-92e6-b0c7a7f78d6c',
                  customPrice: 6905,
                  deletedAt: null,
                },
                {
                  id: '82471fc5-3041-4996-ae59-a6ebcdcc2bfe',
                  customPrice: 19545,
                  deletedAt: null,
                },
                {
                  id: '63ca3012-afd8-4966-8577-65521876874d',
                  customPrice: 12132,
                  deletedAt: null,
                },
                {
                  id: 'baf0ced7-8182-4f75-ad9b-d7879096a54a',
                  customPrice: 10897,
                  deletedAt: null,
                },
                {
                  id: '27ef47b1-e0ae-4709-8d35-6c94bb94f914',
                  customPrice: 9551,
                  deletedAt: null,
                },
                {
                  id: 'f9f581c7-f656-4979-ba61-65995de86536',
                  customPrice: 8502,
                  deletedAt: null,
                },
              ],
            },
            {
              id: '584fa4ff-8dc2-49c4-99e5-71fbc65363ce',
              menuId: '8fd77c64-6e9a-4fa1-b859-ff1aab08e1a5',
              toppingGroupId: '8197f7db-a0e0-4305-8fe8-fc628b57be9f',
              name: 'Hannah Lemke',
              description: 'Corrupti ad ipsam placeat.',
              price: 94443,
              maxQuantity: 3,
              index: 1,
              isActive: true,
              deletedAt: null,
              menuItemToppings: [
                {
                  id: '7d2d18f1-100b-449d-ab6f-08213b130db0',
                  customPrice: 8997,
                  deletedAt: null,
                },
                {
                  id: 'c29395fb-1cfc-4df0-a520-9e74f293bf8f',
                  customPrice: 18862,
                  deletedAt: null,
                },
                {
                  id: '83fb4728-486f-4b87-a1dd-64ae225e69a3',
                  customPrice: 8522,
                  deletedAt: null,
                },
                {
                  id: 'c851a401-e49f-4a99-a849-7189706edd3f',
                  customPrice: 18037,
                  deletedAt: null,
                },
                {
                  id: 'c32dd5f3-21fb-402d-a26e-8a174170fa31',
                  customPrice: 18668,
                  deletedAt: null,
                },
                {
                  id: '1ceb8bd1-0f03-4227-942d-1e5465c5ffee',
                  customPrice: 8520,
                  deletedAt: null,
                },
              ],
            },
          ],
        },
      ],
    },
    nullable: true,
  })
  data: IGetMenuItemToppingsData;
}
