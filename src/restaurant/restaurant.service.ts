import { IGetFavoriteRestaurantsResponse } from './interfaces/get-favorite-restaurants-response.interface';
import { IUpdateFavoriteRestaurantResponse } from './interfaces/update-favorite-restaurant-response.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  GetFavoriteRestaurantsResponseDto,
  GetMenuInformationResponseDto,
  GetMenuItemToppingInfoResponseDto,
  GetRestaurantInformationResponseDto,
  GetSomeRestaurantDto,
  GetSomeRestaurantResponseDto,
  GetTopOrderMenuItemsResponseDto,
  GetToppingInfoOfAMenuDto,
  GetToppingInfoOfAMenuResponseDto,
  UpdateFavoriteRestaurantDto,
  UpdateFavoriteRestaurantResponseDto,
} from './dto/index';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  IRestaurantResponse,
  IRestaurantsResponse,
  IMenuInformationResponse,
} from './interfaces';
import { IMenuItemToppingResponse } from './interfaces/get-menu-topping-info-response.interface';
import { IRestaurantServiceFetchRestaurantDetailOfMerchantResponse } from 'src/user/merchant/restaurant/interfaces';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,

    @Inject(constants.ORDER_SERVICE)
    private orderServiceClient: ClientProxy,
  ) {}

  async getSomeRestaurant(
    getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<GetSomeRestaurantResponseDto> {
    const getSomeRestaurantResponse: IRestaurantsResponse = await this.restaurantServiceClient
      .send('getSomeRestaurant', getSomeRestaurantDto)
      .toPromise();
    const { data, message, status } = getSomeRestaurantResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message: message,
      data,
    };
  }

  async getRestaurantInformation(
    restaurantId: string,
    customerId: string,
  ): Promise<GetRestaurantInformationResponseDto> {
    const getRestaurantInformationResponse: IRestaurantResponse = await this.restaurantServiceClient
      .send('getRestaurantInformation', { restaurantId, customerId })
      .toPromise();

    const { data, message, status } = getRestaurantInformationResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message: message,
      data,
    };
  }

  async getMenuInformation(
    restaurantId,
  ): Promise<GetMenuInformationResponseDto> {
    const getMenuInformationResponse: IMenuInformationResponse = await this.restaurantServiceClient
      .send('getMenuInformation', { restaurantId })
      .toPromise();

    const { data, message, status } = getMenuInformationResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    const { menu } = data;
    const { menuGroups, ...newMenu } = menu;
    return {
      statusCode: status,
      message,
      data: {
        menu: newMenu,
        menuGroups,
      },
    };
  }

  async getMenuItemToppingInfo(
    menuItemId,
  ): Promise<GetMenuItemToppingInfoResponseDto> {
    const getMenuInformationResponse: IMenuItemToppingResponse = await this.restaurantServiceClient
      .send('getMenuItemToppingInfo', { menuItemId })
      .toPromise();

    const { toppingGroups, message, status } = getMenuInformationResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message,
      data: {
        toppingGroups,
      },
    };
  }

  async getTopOrderMenuItems(
    restaurantId: string,
  ): Promise<GetTopOrderMenuItemsResponseDto> {
    const fetchRestaurantDetailResponse: IRestaurantServiceFetchRestaurantDetailOfMerchantResponse = await this.orderServiceClient
      .send('getMenuInsightOfRestaurant', {
        restaurantId,
        limit: 5,
      })
      .toPromise();

    const { status, message, data } = fetchRestaurantDetailResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
      data,
    };
  }

  async getToppingInfoOfAMenu(
    getAllRestaurantOrderDto: GetToppingInfoOfAMenuDto,
    restaurantId: string,
  ): Promise<GetToppingInfoOfAMenuResponseDto> {
    const getToppingInfoOfAMenuResponse: IMenuItemToppingResponse = await this.restaurantServiceClient
      .send('getToppingInfoOfAMenu', {
        ...getAllRestaurantOrderDto,
        restaurantId,
      })
      .toPromise();

    const { toppingGroups, message, status } = getToppingInfoOfAMenuResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message,
      data: {
        toppingGroups,
      },
    };
  }

  async updateFavoriteRestaurant(
    restaurantId: string,
    customerId: string,
    updateFavoriteRestaurantDto: UpdateFavoriteRestaurantDto,
  ): Promise<UpdateFavoriteRestaurantResponseDto> {
    const updateFavoriteRestaurantResponse: IUpdateFavoriteRestaurantResponse = await this.restaurantServiceClient
      .send('updateFavoriteRestaurant', {
        restaurantId,
        customerId,
        ...updateFavoriteRestaurantDto,
      })
      .toPromise();

    const { message, status } = updateFavoriteRestaurantResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message,
    };
  }

  async getFavoriteRestaurants(
    customerId: string,
    { page, size }: { page: number; size: number },
  ): Promise<GetFavoriteRestaurantsResponseDto> {
    const getFavoriteRestaurantsResponse: IGetFavoriteRestaurantsResponse = await this.restaurantServiceClient
      .send('getFavoriteRestaurants', {
        customerId,
        page,
        size,
      })
      .toPromise();

    const { message, status, data } = getFavoriteRestaurantsResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message,
      data,
    };
  }
}
