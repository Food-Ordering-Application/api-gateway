import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateOrderResponseDto,
  CreateOrderDto,
  GetOrderAssociatedWithCusAndResResponseDto,
  GetOrderAssociatedWithCusAndResDto,
  AddNewItemToOrderDto,
  AddNewItemToOrderResponseDto,
  ReduceOrderItemQuantityDto,
  ReduceOrderItemQuantityResponseDto,
  IncreaseOrderItemQuantityDto,
  IncreaseOrderItemQuantityResponseDto,
  RemoveOrderItemDto,
  RemoveOrderItemResponseDto,
  GetAllRestaurantOrderDto,
  GetAllRestaurantOrderResponseDto,
  GetOrderDetailResponseDto,
  UpdateOrderItemQuantityDto,
  UpdateOrderItemQuantityResponseDto,
  PickCustomerAddressResponseDto,
  ConfirmOrderCheckoutDto,
  ConfirmOrderCheckoutResponseDto,
} from './dto';
import {
  ICreateOrderResponse,
  IGetAddressResponse,
  IOrdersResponse,
  IGetMenuItemInfoResponse,
} from './interfaces';
import { ICustomerAddressResponse } from '../user/customer/interfaces';
import { transformOrderItem } from './helpers/helpers';
import { ISimpleResponse } from '../shared/interfaces/simple-response.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject(constants.ORDER_SERVICE)
    private orderServiceClient: ClientProxy,
    @Inject(constants.USER_SERVICE)
    private userServiceClient: ClientProxy,
    @Inject(constants.RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,
  ) {}

  async createOrderAndFirstOrderItem(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    console.log('createOrder');
    const { restaurantId, customerId, orderItem } = createOrderDto;
    let createOrderAndFirstOrderItemResponse: ICreateOrderResponse;
    //TODO: Nếu là order Salechannel
    if (customerId) {
      console.log('Salechannel');
      //TODO: Lấy thông tin địa chỉ nhà hàng, name và price của menuItem
      //TODO: name và price của từng menuItemTopping và thông tin địa chỉ customer
      const [
        getRestaurantAddressInfoResponse,
        getMenuItemInfoResponse,
        getCustomerAddressInfoResponse,
      ]: [
        IGetAddressResponse,
        IGetMenuItemInfoResponse,
        IGetAddressResponse,
      ] = await Promise.all([
        this.restaurantServiceClient
          .send('getRestaurantAddressInfo', {
            restaurantId,
          })
          .toPromise(),
        this.restaurantServiceClient
          .send('getMenuItemInfo', {
            orderItem,
          })
          .toPromise(),
        this.userServiceClient
          .send('getDefaultCustomerAddressInfo', { customerId })
          .toPromise(),
      ]);
      if (getRestaurantAddressInfoResponse.status !== HttpStatus.OK) {
        console.log('getRestaurantAddress fail');
        throw new HttpException(
          {
            message: getRestaurantAddressInfoResponse.message,
          },
          getRestaurantAddressInfoResponse.status,
        );
      }

      if (getMenuItemInfoResponse.status !== HttpStatus.OK) {
        console.log('getMenuItemInfo fail');
        throw new HttpException(
          {
            message: getMenuItemInfoResponse.message,
          },
          getMenuItemInfoResponse.status,
        );
      }

      if (getCustomerAddressInfoResponse.status !== HttpStatus.OK) {
        console.log('getCustomerAddressInfo fail');
        throw new HttpException(
          {
            message: getCustomerAddressInfoResponse.message,
          },
          getCustomerAddressInfoResponse.status,
        );
      }

      const { menuItemToppings, menuItem } = getMenuItemInfoResponse.data;

      const tfOrderItem = transformOrderItem(
        menuItemToppings,
        menuItem,
        orderItem,
      );

      createOrderAndFirstOrderItemResponse = await this.orderServiceClient
        .send('createOrderAndFirstOrderItem', {
          ...createOrderDto,
          restaurantGeom: getRestaurantAddressInfoResponse.data.geom,
          customerGeom: getCustomerAddressInfoResponse.data.geom,
          restaurantAddress: getRestaurantAddressInfoResponse.data.address,
          customerAddress: getCustomerAddressInfoResponse.data.address,
          orderItem: tfOrderItem,
        })
        .toPromise();

      console.log('Successfully Sent');
    } else {
      const [getRestaurantAddressInfoResponse, getMenuItemInfoResponse]: [
        IGetAddressResponse,
        IGetMenuItemInfoResponse,
      ] = await Promise.all([
        this.restaurantServiceClient
          .send('getRestaurantAddressInfo', {
            restaurantId,
          })
          .toPromise(),
        this.restaurantServiceClient
          .send('getMenuItemInfo', {
            orderItem,
          })
          .toPromise(),
      ]);

      if (getRestaurantAddressInfoResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message: getRestaurantAddressInfoResponse.message,
          },
          getRestaurantAddressInfoResponse.status,
        );
      }

      if (getMenuItemInfoResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message: getMenuItemInfoResponse.message,
          },
          getMenuItemInfoResponse.status,
        );
      }
      const { menuItemToppings, menuItem } = getMenuItemInfoResponse.data;

      const tfOrderItem = transformOrderItem(
        menuItemToppings,
        menuItem,
        orderItem,
      );

      createOrderAndFirstOrderItemResponse = await this.orderServiceClient
        .send('createOrderAndFirstOrderItem', {
          ...createOrderDto,
          restaurantGeom: getRestaurantAddressInfoResponse.data.geom,
          restaurantAddress: getRestaurantAddressInfoResponse.data.address,
          orderItem: tfOrderItem,
        })
        .toPromise();
    }

    const { message, order, status } = createOrderAndFirstOrderItemResponse;

    if (status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async getOrderAssociatedWithCusAndRes(
    getOrderAssociatedWithCusAndResDto: GetOrderAssociatedWithCusAndResDto,
  ): Promise<GetOrderAssociatedWithCusAndResResponseDto> {
    const getOrderAssociatedWithCusAndResResponse: ICreateOrderResponse = await this.orderServiceClient
      .send(
        'getOrderAssociatedWithCusAndRes',
        getOrderAssociatedWithCusAndResDto,
      )
      .toPromise();

    const { message, order, status } = getOrderAssociatedWithCusAndResResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async addNewItemToOrder(
    addNewItemToOrderDto: AddNewItemToOrderDto,
    orderId: string,
  ): Promise<AddNewItemToOrderResponseDto> {
    //TODO: Lấy thông tin name và price của món được gửi lên + topping nếu có
    const getMenuItemInfoResponse: IGetMenuItemInfoResponse = await this.restaurantServiceClient
      .send('getMenuItemInfo', {
        orderItem: addNewItemToOrderDto.sendItem,
      })
      .toPromise();

    if (getMenuItemInfoResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getMenuItemInfoResponse.message,
        },
        getMenuItemInfoResponse.status,
      );
    }
    const { menuItemToppings, menuItem } = getMenuItemInfoResponse.data;

    const tfOrderItem = transformOrderItem(
      menuItemToppings,
      menuItem,
      addNewItemToOrderDto.sendItem,
    );

    //TODO: Thêm món đó vào order
    const addNewOrderItemToOrderDtoResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('addNewItemToOrder', {
        ...addNewItemToOrderDto,
        sendItem: tfOrderItem,
        orderId,
      })
      .toPromise();

    const { message, order, status } = addNewOrderItemToOrderDtoResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async reduceOrderItemQuantity(
    reduceOrderItemQuantityDto: ReduceOrderItemQuantityDto,
    orderId: string,
  ): Promise<ReduceOrderItemQuantityResponseDto> {
    const reduceQuantityOrderItemResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('reduceOrderItemQuantity', {
        ...reduceOrderItemQuantityDto,
        orderId,
      })
      .toPromise();
    const { message, order, status } = reduceQuantityOrderItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async increaseOrderItemQuantity(
    increaseOrderItemQuantityDto: IncreaseOrderItemQuantityDto,
    orderId: string,
  ): Promise<IncreaseOrderItemQuantityResponseDto> {
    const increaseOrderItemQuantityResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('increaseOrderItemQuantity', {
        ...increaseOrderItemQuantityDto,
        orderId,
      })
      .toPromise();
    const { message, order, status } = increaseOrderItemQuantityResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async removeOrderItem(
    removeOrderItemDto: RemoveOrderItemDto,
    orderId: string,
  ): Promise<RemoveOrderItemResponseDto> {
    const removeOrderItemResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('removeOrderItem', { ...removeOrderItemDto, orderId })
      .toPromise();

    const { message, order, status } = removeOrderItemResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async getAllRestaurantOrder(
    getAllRestaurantOrderDto: GetAllRestaurantOrderDto,
  ): Promise<GetAllRestaurantOrderResponseDto> {
    const getAllRestaurantOrderResponse: IOrdersResponse = await this.orderServiceClient
      .send('getAllRestaurantOrder', { ...getAllRestaurantOrderDto })
      .toPromise();

    const { message, orders, status } = getAllRestaurantOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        orders,
      },
    };
  }

  async getOrderDetail(orderId: string): Promise<GetOrderDetailResponseDto> {
    const getAllRestaurantOrderResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('getOrderDetail', { orderId })
      .toPromise();

    const { message, order, status } = getAllRestaurantOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async updateOrderItemQuantity(
    updateOrderItemQuantityDto: UpdateOrderItemQuantityDto,
    orderId: string,
  ): Promise<UpdateOrderItemQuantityResponseDto> {
    const updateOrderItemQuantityResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('updateOrderItemQuantity', {
        ...updateOrderItemQuantityDto,
        orderId,
      })
      .toPromise();
    const { message, order, status } = updateOrderItemQuantityResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async pickCustomerAddress(
    customerId: string,
    customerAddressId: string,
    orderId: string,
  ): Promise<PickCustomerAddressResponseDto> {
    //TODO: Update địa chỉ mặc định của customer
    const updateDefaultCustomerAddressResponse: ICustomerAddressResponse = await this.userServiceClient
      .send('updateDefaultCustomerAddress', {
        customerId,
        customerAddressId,
      })
      .toPromise();

    const { address } = updateDefaultCustomerAddressResponse;
    console.log(address);

    if (updateDefaultCustomerAddressResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateDefaultCustomerAddressResponse.message,
        },
        updateDefaultCustomerAddressResponse.status,
      );
    }
    //TODO: Update lại thông tin delivery. Tính toán lại shippingFee trả về thông tin order
    const updateDeliveryAddressResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('updateDeliveryAddress', {
        orderId,
        newAddress: {
          address: address.address,
          geom: address.geom,
        },
      })
      .toPromise();
    const { message, order, status } = updateDeliveryAddressResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async confirmOrderCheckout(
    confirmOrderCheckoutDto: ConfirmOrderCheckoutDto,
    orderId: string,
    customerId: string,
  ): Promise<ConfirmOrderCheckoutResponseDto> {
    //TODO:
    const confirmOrderCheckout: ISimpleResponse = await this.orderServiceClient
      .send('confirmOrderCheckout', {
        ...confirmOrderCheckoutDto,
        orderId,
        customerId,
      })
      .toPromise();

    const { message, status } = confirmOrderCheckout;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
    };
  }
}
