import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ISimpleResponse } from 'src/shared/interfaces/simple-response.interface';
import * as constants from '../../../constants';
import {
  FetchRestaurantDetailOfMerchantResponseDto,
  GetOrderStatisticsOfRestaurantDto,
  GetRevenueInsightOfRestaurantDto,
  GetRestaurantStatisticResponseDto,
  UpdateRestaurantDto,
} from './dto';
import { CreateRestaurantDto } from './dto/create-restaurant/create-restaurant.dto';
import { FetchRestaurantsOfMerchantResponseDto } from './dto/fetch-restaurant/fetch-restaurant-response.dto';
import { FetchRestaurantDto } from './dto/fetch-restaurant/fetch-restaurant.dto';
import {
  IRestaurantServiceFetchRestaurantDetailOfMerchantResponse,
  IRestaurantStatisticResponse,
} from './interfaces';
import { IRestaurantServiceFetchRestaurantsOfMerchantResponse } from './interfaces/restaurant-service-fetch-restaurants-of-merchant-response.interface';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
    @Inject(constants.RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,

    @Inject(constants.ORDER_SERVICE)
    private orderServiceClient: ClientProxy,
  ) {}

  async createRestaurant(
    merchantId: string,
    createRestaurantDto: CreateRestaurantDto,
  ) {
    const isMerchantIdValid: boolean = await this.userServiceClient
      .send('validateMerchantId', merchantId)
      .toPromise();
    if (!isMerchantIdValid) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'MerchantId is not valid',
      };
    }
    const createRestaurantResponse = await this.restaurantServiceClient
      .send('createRestaurant', { merchantId, createRestaurantDto })
      .toPromise();
    const { status, message, data } = createRestaurantResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message }, status);
    }
    return {
      statusCode: 201,
      message,
      data,
    };
  }

  async fetchRestaurantsOfMerchant(
    merchantId: string,
    fetchRestaurantsOfMerchantDto: FetchRestaurantDto,
  ): Promise<FetchRestaurantsOfMerchantResponseDto> {
    const isMerchantIdValid: boolean = await this.userServiceClient
      .send('validateMerchantId', merchantId)
      .toPromise();
    if (!isMerchantIdValid) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'MerchantId is not valid',
        data: null,
      };
    }

    const fetchRestaurantsOfMerchantResponse: IRestaurantServiceFetchRestaurantsOfMerchantResponse = await this.restaurantServiceClient
      .send('fetchRestaurantsOfMerchant', {
        merchantId,
        page: parseInt(fetchRestaurantsOfMerchantDto.page) || 0,
        size: parseInt(fetchRestaurantsOfMerchantDto.size) || 10,
      })
      .toPromise();

    const { status, message, data } = fetchRestaurantsOfMerchantResponse;
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

  async fetchRestaurantDetailOfMerchant(
    restaurantId: string,
    merchantId: string,
  ): Promise<FetchRestaurantDetailOfMerchantResponseDto> {
    const fetchRestaurantDetailResponse: IRestaurantServiceFetchRestaurantDetailOfMerchantResponse = await this.restaurantServiceClient
      .send('fetchRestaurantDetailOfMerchant', {
        merchantId,
        restaurantId,
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

  async getOrderStatisticsOfRestaurant(
    restaurantId: string,
    merchantId: string,
    getOrderStatisticsOfRestaurantDto: GetOrderStatisticsOfRestaurantDto,
  ): Promise<FetchRestaurantDetailOfMerchantResponseDto> {
    const fetchRestaurantDetailResponse: IRestaurantServiceFetchRestaurantDetailOfMerchantResponse = await this.orderServiceClient
      .send('getOrderStatisticsOfRestaurant', {
        merchantId,
        restaurantId,
        ...getOrderStatisticsOfRestaurantDto,
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

  async getRevenueInsightOfRestaurant(
    restaurantId: string,
    merchantId: string,
    getRevenueInsightOfRestaurantDto: GetRevenueInsightOfRestaurantDto,
  ): Promise<FetchRestaurantDetailOfMerchantResponseDto> {
    const fetchRestaurantDetailResponse: IRestaurantServiceFetchRestaurantDetailOfMerchantResponse = await this.orderServiceClient
      .send('getRevenueInsightOfRestaurant', {
        merchantId,
        restaurantId,
        ...getRevenueInsightOfRestaurantDto,
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

  async getRestaurantStatistic(
    merchantId: string,
    restaurantId: string,
  ): Promise<GetRestaurantStatisticResponseDto> {
    const getRestaurantStatisticResponse: IRestaurantStatisticResponse = await this.orderServiceClient
      .send('getRestaurantStatistic', {
        merchantId,
        restaurantId,
      })
      .toPromise();

    const { status, message, statistic } = getRestaurantStatisticResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
      data: {
        statistic,
      },
    };
  }

  async updateRestaurant(
    merchantId: string,
    restaurantId: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const updateRestaurantResponse: ISimpleResponse = await this.restaurantServiceClient
      .send('updateRestaurant', {
        restaurantId,
        merchantId,
        data: updateRestaurantDto,
      })
      .toPromise();

    const { status, message } = updateRestaurantResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }
}
