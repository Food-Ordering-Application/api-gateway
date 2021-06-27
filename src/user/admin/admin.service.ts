import { ISimpleResponse } from './../customer/interfaces/simple-response.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/constants';
import { VerifyRestaurantDto } from './dto/verify-restaurant/verify-restaurant.dto';
import {
  IAdmin,
  IUserServiceFetchAdminResponse,
  IUserServiceFetchRestaurantProfilesResponse,
} from './interfaces';
import {
  FetchRestaurantDto,
  FetchRestaurantProfilesResponseDto,
  GeneratePosKeyDto,
} from './dto';

@Injectable()
export class AdminService {
  constructor(@Inject(USER_SERVICE) private userServiceClient: ClientProxy) {}

  async getAuthenticatedAdmin(
    username: string,
    password: string,
  ): Promise<IAdmin> {
    const authenticatedAdminResponse: IUserServiceFetchAdminResponse = await this.userServiceClient
      .send('getAuthenticatedAdmin', { username, password })
      .toPromise();
    const { message, user, status } = authenticatedAdminResponse;
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

  async verifyRestaurant(verifyRestaurantDto: VerifyRestaurantDto) {
    const { restaurantId } = verifyRestaurantDto;
    const verifyRestaurant: ISimpleResponse = await this.userServiceClient
      .send('verifyRestaurant', { restaurantId })
      .toPromise();
    const { status, message } = verifyRestaurant;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: 200,
      message,
    };
  }

  async generatePosAppKey(generatePosKeyDto: GeneratePosKeyDto) {
    const { restaurantId } = generatePosKeyDto;
    const verifyRestaurant: ISimpleResponse = await this.userServiceClient
      .send('generatePosAppKey', { restaurantId })
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

  async fetchRestaurantProfiles(
    fetchRestaurantProfilesDto: FetchRestaurantDto,
  ): Promise<FetchRestaurantProfilesResponseDto> {
    const fetchRestaurantProfilesResponse: IUserServiceFetchRestaurantProfilesResponse = await this.userServiceClient
      .send('fetchRestaurantProfiles', {
        page: parseInt(fetchRestaurantProfilesDto.page) || 0,
        size: parseInt(fetchRestaurantProfilesDto.size) || 10,
      })
      .toPromise();

    const { status, message, data } = fetchRestaurantProfilesResponse;
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
}
