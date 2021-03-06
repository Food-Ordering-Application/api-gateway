import { PosOrderDto } from './pos-order.dto';
import { OrdStatus, State } from '../enums';
import { ISavePosOrderData } from '../../interfaces';

export const orderExampleData: PosOrderDto = {
  id: '03333c5c-c142-4192-9fd4-497dcac87bbc',
  cashierId: 'a580e92d-5919-4b89-ba78-e81b6b7b2bf0',
  restaurantId: '8a9beb82-7c3f-45a5-883b-9d96a794d1f2',
  itemDiscount: 0,
  discount: 0,
  subTotal: 140000,
  grandTotal: 140000,
  note: '',
  createdAt: new Date('2021-12-08T04:45:56.647Z'),
  updatedAt: new Date('2021-05-16T13:48:15.821Z'),
  status: OrdStatus.COMPLETED,
  orderItems: [
    {
      id: '76f2aea7-6f76-4765-8ac1-928567aefeec',
      menuItemId: '8a1b6c7a-f592-4486-aa84-8d8bf30f7609',
      price: 50000,
      subTotal: 110000,
      name: 'Phở bò',
      quantity: 2,
      discount: 0,
      state: State.IN_STOCK,
      orderItemToppings: [
        {
          id: '7b6ba1d2-5387-4f71-b07a-bb608d048279',
          toppingItemId: '05b040ee-317c-453a-b980-14c5e974348d',
          name: 'Thêm trứng',
          quantity: 1,
          price: 5000,
          state: State.IN_STOCK,
        },
      ],
    },
    {
      id: '76f2aea7-6f76-4765-8ac1-928567aefeec',
      menuItemId: '5040eafd-ef1d-4bc2-9a1e-a24c8ea8da11',
      price: 30000,
      subTotal: 30000,
      name: 'Phở xào',
      quantity: 1,
      discount: 0,
      state: State.IN_STOCK,
      orderItemToppings: [],
    },
  ],
};

export const SavePosOrderExample: ISavePosOrderData = {
  order: orderExampleData,
};
