export const transformOrderItem = (menuItemToppings, menuItem, orderItem) => {
  //? Nếu orderItem ko có topping
  if (
    !orderItem.orderItemToppings ||
    orderItem.orderItemToppings?.length === 0
  ) {
    return {
      ...orderItem,
      name: menuItem.name,
      price: menuItem.price,
      orderItemToppings: null,
    };
  } else {
    //? Nếu orderItem có topping
    const transformOrderItemToppings = orderItem.orderItemToppings.map(
      (orderItemTopping) => {
        const findMenuItemToppingInfo = menuItemToppings.find(
          (menuItemToppingInfo) =>
            menuItemToppingInfo.id === orderItemTopping.menuItemToppingId,
        );
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
