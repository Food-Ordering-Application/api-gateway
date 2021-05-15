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
} from './dto';
import { ICreateOrderResponse, IGetAddressResponse } from './interfaces';
import { IOrdersResponse } from './interfaces/orders-response.interface';
import { ICustomerAddressResponse } from 'src/user/customer/interfaces';

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
    const { restaurantId, customerId } = createOrderDto;
    let createOrderAndFirstOrderItemResponse: ICreateOrderResponse;
    /* Nếu là order Salechannel */
    if (customerId) {
      /* Lấy thông tin địa chỉ nhà hàng và thông tin địa chỉ customer */
      const values = await Promise.all([
        this.restaurantServiceClient
          .send('getRestaurantAddressInfo', { restaurantId })
          .toPromise(),
        this.userServiceClient
          .send('getDefaultCustomerAddressInfo', { customerId })
          .toPromise(),
      ]);
      const getRestaurantAddressInfoResponse: IGetAddressResponse = values[0];

      if (getRestaurantAddressInfoResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message: getRestaurantAddressInfoResponse.message,
          },
          getRestaurantAddressInfoResponse.status,
        );
      }

      const getCustomerAddressInfoResponse: IGetAddressResponse = values[1];

      if (getCustomerAddressInfoResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message: getCustomerAddressInfoResponse.message,
          },
          getCustomerAddressInfoResponse.status,
        );
      }

      createOrderAndFirstOrderItemResponse = await this.orderServiceClient
        .send('createOrderAndFirstOrderItem', {
          ...createOrderDto,
          restaurantGeom: getRestaurantAddressInfoResponse.data.geom,
          customerGeom: getCustomerAddressInfoResponse.data.geom,
          restaurantAddress: getRestaurantAddressInfoResponse.data.address,
          customerAddress: getCustomerAddressInfoResponse.data.address,
        })
        .toPromise();
    } else {
      createOrderAndFirstOrderItemResponse = await this.orderServiceClient
        .send('createOrderAndFirstOrderItem', createOrderDto)
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
    const getOrderAssociatedWithCusAndResResponse: ICreateOrderResponse =
      await this.orderServiceClient
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
    const addNewOrderItemToOrderDtoResponse: ICreateOrderResponse =
      await this.orderServiceClient
        .send('addNewItemToOrder', { ...addNewItemToOrderDto, orderId })
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
    const reduceQuantityOrderItemResponse: ICreateOrderResponse =
      await this.orderServiceClient
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
    const increaseOrderItemQuantityResponse: ICreateOrderResponse =
      await this.orderServiceClient
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
    const removeOrderItemResponse: ICreateOrderResponse =
      await this.orderServiceClient
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
    const getAllRestaurantOrderResponse: IOrdersResponse =
      await this.orderServiceClient
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
    const getAllRestaurantOrderResponse: ICreateOrderResponse =
      await this.orderServiceClient
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
    const updateOrderItemQuantityResponse: ICreateOrderResponse =
      await this.orderServiceClient
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
    const updateDefaultCustomerAddressResponse: ICustomerAddressResponse =
      await this.userServiceClient
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
    const updateDeliveryAddressResponse: ICreateOrderResponse =
      await this.orderServiceClient
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
}
