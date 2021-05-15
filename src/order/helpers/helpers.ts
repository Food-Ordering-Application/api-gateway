export const transformOrderItem = (menuItemToppings, menuItem, orderItem) => {
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
};
