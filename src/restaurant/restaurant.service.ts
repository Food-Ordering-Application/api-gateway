import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  GetMenuInformationResponseDto,
  GetMenuItemToppingInfoResponseDto,
  GetRestaurantInformationResponseDto,
  GetSomeRestaurantDto,
  GetSomeRestaurantResponseDto,
  GetToppingInfoOfAMenuDto,
  GetToppingInfoOfAMenuResponseDto,
} from './dto/index';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  IRestaurantResponse,
  IRestaurantsResponse,
  IMenuInformationResponse,
} from './interfaces';
import { IMenuItemToppingResponse } from './interfaces/get-menu-topping-info-response.interface';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,
  ) {}

  async getSomeRestaurant(
    getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<GetSomeRestaurantResponseDto> {
    const getSomeRestaurantResponse: IRestaurantsResponse =
      await this.restaurantServiceClient
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
    restaurantId,
  ): Promise<GetRestaurantInformationResponseDto> {
    const getRestaurantInformationResponse: IRestaurantResponse =
      await this.restaurantServiceClient
        .send('getRestaurantInformation', { restaurantId })
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
    const getMenuInformationResponse: IMenuInformationResponse =
      await this.restaurantServiceClient
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
    const getMenuInformationResponse: IMenuItemToppingResponse =
      await this.restaurantServiceClient
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
}
