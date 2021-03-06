import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../../../constants';
import { ISimpleResponse } from '../../../../../shared/interfaces/simple-response.interface';
import {
  CreateToppingItemDto,
  CreateToppingItemResponseDto,
  DeleteToppingItemResponseDto,
  FetchMenuItemToppingsOfCurrentToppingItemResponseDto,
  FetchToppingItemByMenuResponseDto,
  FetchToppingItemQuery,
  GetToppingItemDetailResponseDto,
  UpdateMenuItemToppingsOfCurrentToppingItemDto,
  UpdateMenuItemToppingsOfCurrentToppingItemResponseDto,
  UpdateToppingItemDto,
  UpdateToppingItemResponseDto,
} from './dto';
import {
  IRestaurantServiceCreateToppingItemResponse,
  IRestaurantServiceFetchMenuItemToppingsOfCurrentToppingItemResponse,
  IRestaurantServiceFetchToppingItemByMenuResponse,
} from './interfaces';

@Injectable()
export class ToppingItemService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE)
    private toppingItemServiceClient: ClientProxy,
  ) {}

  async createToppingItem(
    merchantId: string,
    restaurantId: string,
    menuId: string,
    createToppingItemDto: CreateToppingItemDto,
  ): Promise<CreateToppingItemResponseDto> {
    const createToppingItemResponse: IRestaurantServiceCreateToppingItemResponse = await this.toppingItemServiceClient
      .send('createToppingItem', {
        merchantId,
        restaurantId,
        menuId,
        data: createToppingItemDto,
      })
      .toPromise();

    const { status, message, data } = createToppingItemResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message }, status);
    }
    const { toppingItem } = data;
    return {
      statusCode: 201,
      message,
      data: {
        toppingItem,
      },
    };
  }

  async updateToppingItem(
    toppingItemId: string,
    merchantId: string,
    restaurantId: string,
    menuId: string,
    updateToppingItemDto: UpdateToppingItemDto,
  ): Promise<UpdateToppingItemResponseDto> {
    const updateToppingItemResponse: ISimpleResponse = await this.toppingItemServiceClient
      .send('updateToppingItem', {
        toppingItemId,
        merchantId,
        restaurantId,
        menuId,
        data: updateToppingItemDto,
      })
      .toPromise();

    const { status, message } = updateToppingItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async deleteToppingItem(
    toppingItemId: string,
    merchantId: string,
    restaurantId: string,
    menuId: string,
  ): Promise<DeleteToppingItemResponseDto> {
    const deleteToppingItemResponse: ISimpleResponse = await this.toppingItemServiceClient
      .send('deleteToppingItem', {
        toppingItemId,
        merchantId,
        restaurantId,
        menuId,
      })
      .toPromise();

    const { status, message } = deleteToppingItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async getToppingItemDetail(
    toppingItemId: string,
    merchantId: string,
    restaurantId: string,
    menuId: string,
  ): Promise<GetToppingItemDetailResponseDto> {
    const getToppingItemDetailResponse: ISimpleResponse = await this.toppingItemServiceClient
      .send('getToppingItemDetail', {
        toppingItemId,
        merchantId,
        restaurantId,
        menuId,
      })
      .toPromise();

    const { status, message, data } = getToppingItemDetailResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
      data,
    };
  }

  async fetchToppingItem(
    merchantId: string,
    restaurantId: string,
    menuId: string,
    fetchToppingItemByMenuQuery: FetchToppingItemQuery,
  ): Promise<FetchToppingItemByMenuResponseDto> {
    const fetchToppingItemResponse: IRestaurantServiceFetchToppingItemByMenuResponse = await this.toppingItemServiceClient
      .send('fetchToppingItemOfMenu', {
        merchantId,
        restaurantId,
        menuId,
        page: parseInt(fetchToppingItemByMenuQuery.page) || 0,
        size: parseInt(fetchToppingItemByMenuQuery.size) || 10,
        search: fetchToppingItemByMenuQuery.q,
      })
      .toPromise();

    const { status, message, data } = fetchToppingItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }
    const { results, size, total } = data;
    return {
      statusCode: 200,
      message,
      data: {
        results,
        size,
        total,
      },
    };
  }

  async fetchMenuItemToppingsOfCurrentToppingItem(
    merchantId: string,
    restaurantId: string,
    menuId: string,
    toppingItemId: string,
  ): Promise<FetchMenuItemToppingsOfCurrentToppingItemResponseDto> {
    const fetchMenuItemToppingsOfCurrentToppingItemResponse: IRestaurantServiceFetchMenuItemToppingsOfCurrentToppingItemResponse = await this.toppingItemServiceClient
      .send('fetchMenuItemToppingsOfCurrentToppingItem', {
        merchantId,
        restaurantId,
        menuId,
        toppingItemId,
      })
      .toPromise();

    const {
      status,
      message,
      data,
    } = fetchMenuItemToppingsOfCurrentToppingItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }
    return {
      statusCode: 200,
      message,
      data,
    };
  }

  async updateMenuToppingsOfCurrentToppingItem(
    toppingItemId: string,
    merchantId: string,
    restaurantId: string,
    menuId: string,
    updateToppingItemDto: UpdateMenuItemToppingsOfCurrentToppingItemDto,
  ): Promise<UpdateMenuItemToppingsOfCurrentToppingItemResponseDto> {
    const updateMenuItemToppingsOfCurrentToppingItemResponse: ISimpleResponse = await this.toppingItemServiceClient
      .send('updateMenuItemToppingsOfCurrentToppingItem', {
        toppingItemId,
        merchantId,
        restaurantId,
        menuId,
        data: updateToppingItemDto,
      })
      .toPromise();

    const {
      status,
      message,
    } = updateMenuItemToppingsOfCurrentToppingItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }
}
