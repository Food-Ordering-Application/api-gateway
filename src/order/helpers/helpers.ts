import { IIdNameAndPriceData } from '../interfaces';
import { OrderItem } from '../dto';

export const transformOrderItem = (
  menuItemToppings: IIdNameAndPriceData[],
  menuItem: { name: string; price: number },
  orderItem: OrderItem,
) => {
  console.log('MenuItem', menuItem);
  console.log('MenuItemToppings', menuItemToppings);
  console.log('OrderItem', orderItem);
  //? Nếu orderItem ko có topping
  if (
    !orderItem.orderItemToppings ||
    orderItem.orderItemToppings.length === 0
  ) {
    console.log('Orderitem no topping');
    return {
      ...orderItem,
      name: menuItem.name,
      price: menuItem.price,
      orderItemToppings: null,
    };
  } else {
    //? Nếu orderItem có topping
    console.log('Orderitem have topping');
    const transformOrderItemToppings = orderItem.orderItemToppings.map(
      (orderItemTopping) => {
        const findMenuItemToppingInfo = menuItemToppings.find(
          (menuItemToppingInfo) => {
            return (
              menuItemToppingInfo.toppingItemId ===
                orderItemTopping.toppingItemId &&
              menuItemToppingInfo.menuItemId === orderItem.menuItemId
            );
          },
        );
        console.log('FindMenuItemToppingInfo', findMenuItemToppingInfo);

        return {
          ...orderItemTopping,
          name: findMenuItemToppingInfo.name,
          price: findMenuItemToppingInfo.price,
        };
      },
    );

    return {
      ...orderItem,
      name: menuItem.name,
      price: menuItem.price,
      orderItemToppings: transformOrderItemToppings,
    };
  }
};
