import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../../../constants';
import { ISimpleResponse } from '../../../../../shared/interfaces/simple-response.interface';
import {
  CreateMenuItemDto,
  CreateMenuItemResponseDto,
  DeleteMenuItemResponseDto,
  FetchMenuItemByMenuResponseDto,
  FetchMenuItemQuery,
  GetMenuItemDetailResponseDto,
  GetMenuItemToppingsOfCurrentMenuItemResponseDto,
  UpdateMenuItemDto,
  UpdateMenuItemResponseDto,
  UpdateMenuItemToppingsOfCurrentMenuItemDto,
  UpdateMenuItemToppingsOfCurrentMenuItemResponseDto,
} from './dto';
import {
  IRestaurantServiceCreateMenuItemResponse,
  IRestaurantServiceFetchMenuItemByMenuResponse,
  IRestaurantServiceGetMenuItemDetailResponse,
} from './interfaces';

@Injectable()
export class MenuItemService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE)
    private menuItemServiceClient: ClientProxy,
  ) {}

  async createMenuItem(
    merchantId: string,
    restaurantId: string,
    menuId: string,
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<CreateMenuItemResponseDto> {
    const createMenuItemResponse: IRestaurantServiceCreateMenuItemResponse = await this.menuItemServiceClient
      .send('createMenuItem', {
        merchantId,
        restaurantId,
        menuId,
        data: createMenuItemDto,
      })
      .toPromise();

    const { status, message, data } = createMenuItemResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message }, status);
    }
    const { menuItem } = data;
    return {
      statusCode: 201,
      message,
      data: {
        menuItem,
      },
    };
  }

  async updateMenuItem(
    menuItemId: string,
    merchantId: string,
    restaurantId: string,
    menuId: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<UpdateMenuItemResponseDto> {
    const updateMenuItemResponse: ISimpleResponse = await this.menuItemServiceClient
      .send('updateMenuItem', {
        menuItemId,
        merchantId,
        restaurantId,
        menuId,
        data: updateMenuItemDto,
      })
      .toPromise();

    const { status, message } = updateMenuItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async deleteMenuItem(
    menuItemId: string,
    merchantId: string,
    restaurantId: string,
    menuId: string,
  ): Promise<DeleteMenuItemResponseDto> {
    const deleteMenuItemResponse: ISimpleResponse = await this.menuItemServiceClient
      .send('deleteMenuItem', {
        menuItemId,
        merchantId,
        restaurantId,
        menuId,
      })
      .toPromise();

    const { status, message } = deleteMenuItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async fetchMenuItem(
    merchantId: string,
    restaurantId: string,
    menuId: string,
    fetchMenuItemByMenuQuery: FetchMenuItemQuery,
  ): Promise<FetchMenuItemByMenuResponseDto> {
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse = await this.menuItemServiceClient
      .send('fetchMenuItemOfMenu', {
        merchantId,
        restaurantId,
        menuId,
        page: parseInt(fetchMenuItemByMenuQuery.page) || 0,
        size: parseInt(fetchMenuItemByMenuQuery.size) || 10,
        search: fetchMenuItemByMenuQuery.q,
      })
      .toPromise();

    const { status, message, data } = fetchMenuItemResponse;
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

  async getMenuItemDetail(
    menuItemId: string,
    merchantId: string,
    restaurantId: string,
    menuId: string,
  ): Promise<GetMenuItemDetailResponseDto> {
    const getMenuItemDetailResponse: IRestaurantServiceGetMenuItemDetailResponse = await this.menuItemServiceClient
      .send('getMenuItemDetail', {
        menuItemId,
        merchantId,
        restaurantId,
        menuId,
      })
      .toPromise();

    const { status, message, data } = getMenuItemDetailResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
      data,
    };
  }

  async fetchMenuItemToppingsOfCurrentMenuItem(
    merchantId: string,
    restaurantId: string,
    menuId: string,
    menuItemId: string,
  ): Promise<GetMenuItemToppingsOfCurrentMenuItemResponseDto> {
    const fetchMenuItemToppingsOfCurrentMenuItemResponse: ISimpleResponse = await this.menuItemServiceClient
      .send('fetchMenuItemToppingsOfCurrentMenuItem', {
        merchantId,
        restaurantId,
        menuId,
        menuItemId,
      })
      .toPromise();

    const {
      status,
      message,
      data,
    } = fetchMenuItemToppingsOfCurrentMenuItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }
    return {
      statusCode: 200,
      message,
      data,
    };
  }

  async updateMenuToppingsOfCurrentMenuItem(
    menuItemId: string,
    merchantId: string,
    restaurantId: string,
    menuId: string,
    updateToppingItemDto: UpdateMenuItemToppingsOfCurrentMenuItemDto,
  ): Promise<UpdateMenuItemToppingsOfCurrentMenuItemResponseDto> {
    const updateMenuItemToppingsOfCurrentMenuItemResponse: ISimpleResponse = await this.menuItemServiceClient
      .send('updateMenuItemToppingsOfCurrentMenuItem', {
        menuItemId,
        merchantId,
        restaurantId,
        menuId,
        data: updateToppingItemDto,
      })
      .toPromise();

    const { status, message } = updateMenuItemToppingsOfCurrentMenuItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }
}
