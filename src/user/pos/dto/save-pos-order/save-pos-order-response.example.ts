import { OrdStatus, PType, State } from '../enums';
import { ISavePosOrderData } from '../../interfaces';

export const SavePosOrderExample: ISavePosOrderData = {
  order: {
    id: '03333c5c-c142-4192-9fd4-497dcac87bbc',
    cashierId: 'a580e92d-5919-4b89-ba78-e81b6b7b2bf0',
    restaurantId: 'fef41594-94b8-469e-82c9-ea8b244693b9',
    itemDiscount: 117661,
    discount: 7807,
    subTotal: 192814,
    grandTotal: 287350,
    note: 'New Note',
    createdAt: new Date('2021-12-08T04:45:56.647Z'),
    updatedAt: new Date('2021-05-16T13:48:15.821Z'),
    paymentType: PType.COD,
    status: OrdStatus.COMPLETED,
    orderItems: [
      {
        id: '76f2aea7-6f76-4765-8ac1-928567aefeec',
        menuItemId: '561d3e04-c8a1-4732-9a1f-80e6601206d4',
        price: 110098,
        subTotal: 177304,
        name: 'Rosella Gutmann',
        quantity: 4,
        discount: 23353,
        state: State.IN_STOCK,
        orderItemToppings: [
          {
            id: '7b6ba1d2-5387-4f71-b07a-bb608d048279',
            toppingItemId: '05b040ee-317c-453a-b980-14c5e974348d',
            name: 'Marley Kreiger',
            quantity: 3,
            price: 270961,
            state: State.IN_STOCK,
          },
          {
            id: '4a949c7c-24dc-402d-8266-549f865a1284',
            toppingItemId: 'b2573e8d-2450-4147-a89c-cd861f58d780',
            name: 'Grace Bosco',
            quantity: 4,
            price: 41726,
            state: State.IN_STOCK,
          },
        ],
      },
      {
        id: 'dfa9a593-d3c0-471b-bab3-8e6fdd7d8e94',
        menuItemId: '82a5677b-ac38-40fc-9921-a663cbeb2862',
        price: 191594,
        subTotal: 109325,
        name: 'Gregoria Kutch',
        quantity: 4,
        discount: 16661,
        state: State.IN_STOCK,
        orderItemToppings: [
          {
            id: 'a59dedbf-bfe3-4c9a-8da7-78a73ffff623',
            toppingItemId: '227e8631-d5bb-4e28-a67d-1189e7c50904',
            name: 'Daisy Hintz',
            quantity: 0,
            price: 104702,
            state: State.IN_STOCK,
          },
          {
            id: '0402b0c5-4ed9-41c2-ad5a-322ad0200d42',
            toppingItemId: 'a1f58403-a1c0-4ebb-9249-60d2ffd5e2b3',
            name: 'Beulah Gutmann',
            quantity: 0,
            price: 265321,
            state: State.IN_STOCK,
          },
        ],
      },
    ],
  },
};
