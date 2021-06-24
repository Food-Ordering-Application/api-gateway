import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE, RESTAURANT_SERVICE, ORDER_SERVICE } from 'src/constants';
import { ISimpleResponse } from '../merchant/interfaces';
import { IRestaurantServiceFetchMenuOfRestaurantResponse } from '../merchant/restaurant/menu/interfaces';
import { IRestaurantServiceFetchMenuItemByMenuResponse } from '../merchant/restaurant/menu/menu-item/interfaces';
import {
  ConfirmOrderResponseDto,
  FetchDto,
  FinishOrderResponseDto,
  GetIsAutoConfirmOrderOkResponseDto,
  SavePosOrderDto,
  SavePosOrderResponseDto,
  UpdateIsAutoConfirmOrderDto,
  UpdateIsAutoConfirmOrderOkResponseDto,
  UpdateMenuItemDto,
  UpdateMenuItemResponseDto,
  UpdateToppingItemDto,
  UpdateToppingItemResponseDto,
  VerifyAppKeyDto,
  VerifyAppKeyResponseDto,
  VoidOrderDto,
  VoidOrderResponseDto,
} from './dto';
import {
  IIsAutoConfirmResponse,
  IOrderServiceFinishOrderResponse,
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
    const verifyRestaurant: IUserServiceVerifyAppKeyResponse = await this.userServiceClient
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
    const authenticatedStaffResponse: IUserServiceLoginPosResponse = await this.userServiceClient
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
    const fetchMenuOfRestaurantResponse: IRestaurantServiceFetchMenuOfRestaurantResponse = await this.restaurantServiceClient
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
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse = await this.restaurantServiceClient
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
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse = await this.restaurantServiceClient
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
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse = await this.restaurantServiceClient
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
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse = await this.restaurantServiceClient
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
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse = await this.restaurantServiceClient
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
    const saveOrderResponse: IOrderServiceSavePosOrderResponse = await this.orderServiceClient
      .send('savePosOrder', { order })
      .toPromise();

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
    const restaurantConfirmOrderResponse: IOrderServiceSavePosOrderResponse = await this.orderServiceClient
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

  async finishDeliveryOrder(
    orderId: string,
    restaurantId: string,
  ): Promise<FinishOrderResponseDto> {
    const restaurantFinishOrderResponse: IOrderServiceFinishOrderResponse = await this.orderServiceClient
      .send('restaurantFinishOrder', {
        orderId,
        restaurantId,
      })
      .toPromise();

    const { status, message } = restaurantFinishOrderResponse;

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
    const restaurantVoidOrderResponse: IOrderServiceSavePosOrderResponse = await this.orderServiceClient
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

  async updateMenuItem(
    menuItemId: string,
    restaurantId: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<UpdateMenuItemResponseDto> {
    const updateMenuItemResponse: ISimpleResponse = await this.restaurantServiceClient
      .send('updateMenuItem', {
        menuItemId,
        restaurantId,
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

  async updateToppingItem(
    toppingItemId: string,
    restaurantId: string,
    updateToppingItemDto: UpdateToppingItemDto,
  ): Promise<UpdateToppingItemResponseDto> {
    const updateToppingItemResponse: ISimpleResponse = await this.restaurantServiceClient
      .send('updateToppingItem', {
        toppingItemId,
        restaurantId,
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

  //! Update thông tin isAutoConfirm của merchant
  async updateIsAutoConfirmOrder(
    tokenRestaurantId: string,
    updateIsAutoConfirmOrderDto: UpdateIsAutoConfirmOrderDto,
  ): Promise<UpdateIsAutoConfirmOrderOkResponseDto> {
    //TODO:
    const updateIsAutoConfirmOrderResponse: IIsAutoConfirmResponse = await this.userServiceClient
      .send('updateIsAutoConfirmOrder', {
        tokenRestaurantId,
        ...updateIsAutoConfirmOrderDto,
      })
      .toPromise();

    const { message, status, isAutoConfirm } = updateIsAutoConfirmOrderResponse;

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
      data: {
        isAutoConfirm: isAutoConfirm,
      },
    };
  }

  //! Fetch thông tin isAutoConfirmOrder của merchant
  async getIsAutoConfirmOrder(
    tokenRestaurantId: string,
  ): Promise<GetIsAutoConfirmOrderOkResponseDto> {
    //TODO:
    const getIsAutoConfirmOrderResponse: IIsAutoConfirmResponse = await this.userServiceClient
      .send('getIsAutoConfirm', {
        restaurantId: tokenRestaurantId,
      })
      .toPromise();

    const { message, status, isAutoConfirm } = getIsAutoConfirmOrderResponse;

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
      data: {
        isAutoConfirm: isAutoConfirm,
      },
    };
  }
}
