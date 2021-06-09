import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RESTAURANT_SERVICE } from 'src/constants';
import { GetCityDto, GetDistrictsDto, GetDistrictsResponseDto } from './dto';
import { IGetDistrictsResponse } from './interfaces';

@Injectable()
export class GeoService {
  constructor(
    @Inject(RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,
  ) {}

  async getDistrictsOfCity(
    getDistrictsDto: GetDistrictsDto,
  ): Promise<GetDistrictsResponseDto> {
    const { cityId } = getDistrictsDto;
    const getDistrictsOfCityResponse: IGetDistrictsResponse =
      await this.restaurantServiceClient
        .send('getDistrictsOfCity', { cityId })
        .toPromise();
    const { data, message, status } = getDistrictsOfCityResponse;
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

  async getCityFromLocation(
    getCityDto: GetCityDto,
  ): Promise<GetDistrictsResponseDto> {
    const { position } = getCityDto;
    const getDistrictsOfCityResponse: IGetDistrictsResponse =
      await this.restaurantServiceClient
        .send('getCityFromLocation', { position })
        .toPromise();
    const { data, message, status } = getDistrictsOfCityResponse;
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
}
