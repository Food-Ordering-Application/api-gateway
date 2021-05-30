import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE, RESTAURANT_SERVICE, ORDER_SERVICE } from 'src/constants';
import { IRestaurantServiceFetchMenuOfRestaurantResponse } from '../merchant/restaurant/menu/interfaces';
import { IRestaurantServiceFetchMenuItemByMenuResponse } from '../merchant/restaurant/menu/menu-item/interfaces';
import {
  ConfirmOrderResponseDto,
  FetchDto,
  SavePosOrderDto,
  SavePosOrderResponseDto,
  VerifyAppKeyDto,
  VerifyAppKeyResponseDto,
  VoidOrderDto,
  VoidOrderResponseDto,
} from './dto';
import {
  IOrderServiceSavePosOrderResponse,
  IStaffLogin,
  IUserServiceLoginPosResponse,
  IUserServiceVerifyAppKeyResponse,
} from './interfaces';

@Injectable()
export class PosService {
  constructor(
    @Inject(USER_SERVICE)
    private userServiceClient: ClientProxy,
    @Inject(RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,
    @Inject(ORDER_SERVICE)
    private orderServiceClient: ClientProxy,
  ) {}

  async verifyAppKey(
    verifyAppKeyDto: VerifyAppKeyDto,
  ): Promise<VerifyAppKeyResponseDto> {
    const { posAppKey, deviceId } = verifyAppKeyDto;
    const verifyRestaurant: IUserServiceVerifyAppKeyResponse =
      await this.userServiceClient
        .send('verifyPosAppKey', { posAppKey, deviceId })
        .toPromise();
    const { status, message, data } = verifyRestaurant;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: 200,
      message,
      data,
    };
  }

  async getAuthenticatedStaff(
    username: string,
    password: string,
    restaurantId: string,
  ): Promise<IStaffLogin> {
    const authenticatedStaffResponse: IUserServiceLoginPosResponse =
      await this.userServiceClient
        .send('getAuthenticatedStaff', { username, password, restaurantId })
        .toPromise();
    const { message, user, status } = authenticatedStaffResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return user;
  }
  async fetchMenuOfRestaurant(restaurantId: string) {
    const fetchMenuOfRestaurantResponse: IRestaurantServiceFetchMenuOfRestaurantResponse =
      await this.restaurantServiceClient
        .send('fetchMenuOfRestaurant', {
          restaurantId,
          page: 0,
          size: 1,
        })
        .toPromise();

    const { status, message, data } = fetchMenuOfRestaurantResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }
    const { results } = data;
    return {
      statusCode: 200,
      message,
      data: {
        menuId: results[0]?.id,
      },
    };
  }
  async fetchMenuItem(
    restaurantId: string,
    menuId: string,
    fetchDto: FetchDto,
  ) {
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse =
      await this.restaurantServiceClient
        .send('fetchMenuItemOfMenu', {
          merchantId: null,
          restaurantId,
          menuId,
          page: parseInt(fetchDto.page) || 0,
          size: parseInt(fetchDto.size) || 50,
          search: '',
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

  async fetchMenuGroup(
    restaurantId: string,
    menuId: string,
    fetchDto: FetchDto,
  ) {
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse =
      await this.restaurantServiceClient
        .send('fetchMenuGroupOfMenu', {
          merchantId: null,
          restaurantId,
          menuId,
          page: parseInt(fetchDto.page) || 0,
          size: parseInt(fetchDto.size) || 50,
          search: '',
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

  async fetchToppingItem(
    restaurantId: string,
    menuId: string,
    fetchDto: FetchDto,
  ) {
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse =
      await this.restaurantServiceClient
        .send('fetchToppingItemOfMenu', {
          merchantId: null,
          restaurantId,
          menuId,
          page: parseInt(fetchDto.page) || 0,
          size: parseInt(fetchDto.size) || 50,
          search: '',
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

  async fetchToppingGroup(
    restaurantId: string,
    menuId: string,
    fetchDto: FetchDto,
  ) {
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse =
      await this.restaurantServiceClient
        .send('fetchToppingGroupOfMenu', {
          merchantId: null,
          restaurantId,
          menuId,
          page: parseInt(fetchDto.page) || 0,
          size: parseInt(fetchDto.size) || 50,
          search: '',
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

  async fetchMenuItemTopping(
    restaurantId: string,
    menuId: string,
    fetchDto: FetchDto,
  ) {
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse =
      await this.restaurantServiceClient
        .send('fetchMenuItemToppingOfMenu', {
          merchantId: null,
          restaurantId,
          menuId,
          page: parseInt(fetchDto.page) || 0,
          size: parseInt(fetchDto.size) || 50,
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

  async savePosOrder(
    savePosOrderDto: SavePosOrderDto,
  ): Promise<SavePosOrderResponseDto> {
    const { order } = savePosOrderDto;
    const saveOrderResponse: IOrderServiceSavePosOrderResponse =
      await this.orderServiceClient.send('savePosOrder', { order }).toPromise();

    const { status, message, data } = saveOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: 200,
      message,
      data,
    };
  }

  async confirmDeliveryOrder(
    orderId: string,
    staffId: string,
    restaurantId: string,
  ): Promise<ConfirmOrderResponseDto> {
    const restaurantConfirmOrderResponse: IOrderServiceSavePosOrderResponse =
      await this.orderServiceClient
        .send('restaurantConfirmOrder', {
          orderId,
          cashierId: staffId,
          restaurantId,
        })
        .toPromise();

    const { status, message } = restaurantConfirmOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async voidDeliveryOrder(
    orderId: string,
    staffId: string,
    restaurantId: string,
    voidOrderDto: VoidOrderDto,
  ): Promise<VoidOrderResponseDto> {
    const { cashierNote, orderItemIds } = voidOrderDto;
    const restaurantVoidOrderResponse: IOrderServiceSavePosOrderResponse =
      await this.orderServiceClient
        .send('restaurantVoidOrder', {
          orderId,
          cashierId: staffId,
          restaurantId,
          orderItemIds,
          cashierNote,
        })
        .toPromise();

    const { status, message } = restaurantVoidOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }
}
