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
} from './dto';
import { ICreateOrderResponse } from './interfaces';
import { IOrdersResponse } from './interfaces/orders-response.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject(constants.ORDER_SERVICE)
    private orderServiceClient: ClientProxy,
  ) {}

  async createOrderAndFirstOrderItem(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    const createOrderAndFirstOrderItemResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('createOrderAndFirstOrderItem', createOrderDto)
      .toPromise();

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
    const addNewOrderItemToOrderDtoResponse: ICreateOrderResponse = await this.orderServiceClient
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
}
