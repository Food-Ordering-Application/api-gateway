export const transformOrderItem = (menuItemToppings, menuItem, orderItem) => {
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
          (menuItemToppingInfo) =>
            menuItemToppingInfo.id === orderItemTopping.menuItemToppingId,
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
