import { ISimpleResponse } from './../customer/interfaces/simple-response.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/constants';
import { VerifyRestaurantDto } from './dto/verify-restaurant/verify-restaurant.dto';
import {
  IAdmin,
  IDriversResponse,
  IUserServiceFetchAdminResponse,
  IUserServiceFetchRestaurantProfilesResponse,
} from './interfaces';
import {
  FetchRestaurantDto,
  FetchRestaurantProfilesResponseDto,
  GeneratePosKeyDto,
  RemovePosDeviceDto,
} from './dto';
import { GetListDriverDto } from './dto/list-driver/get-list-driver.dto';
import { GetListDriverOkResponseDto } from './dto/list-driver/get-list-driver-ok-response.dto';

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
    const generatePosAppKey: ISimpleResponse = await this.userServiceClient
      .send('generatePosAppKey', { restaurantId })
      .toPromise();
    const { status, message, data } = generatePosAppKey;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: 200,
      message,
      data,
    };
  }

  async removePosDevice(removePosDeviceDto: RemovePosDeviceDto) {
    const { restaurantId } = removePosDeviceDto;
    const removePosDevice: ISimpleResponse = await this.userServiceClient
      .send('removePosDevice', { restaurantId })
      .toPromise();
    const { status, message } = removePosDevice;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: 200,
      message,
    };
  }

  async fetchRestaurantProfiles(
    fetchRestaurantProfilesDto: FetchRestaurantDto,
  ): Promise<FetchRestaurantProfilesResponseDto> {
    const fetchRestaurantProfilesResponse: IUserServiceFetchRestaurantProfilesResponse = await this.userServiceClient
      .send('fetchRestaurantProfiles', {
        page: parseInt(fetchRestaurantProfilesDto.page) || 0,
        size: parseInt(fetchRestaurantProfilesDto.size) || 10,
        query: fetchRestaurantProfilesDto?.q,
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

  //! L???y danh s??ch t??i x???
  async getListDriver(
    adminId: string,
    getListDriverDto: GetListDriverDto,
  ): Promise<GetListDriverOkResponseDto> {
    const getListDriverResponse: IDriversResponse = await this.userServiceClient
      .send('getListDriver', {
        ...getListDriverDto,
        adminId,
      })
      .toPromise();

    const { message, status, drivers, total } = getListDriverResponse;

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
        drivers: drivers,
        total,
      },
    };
  }
}
