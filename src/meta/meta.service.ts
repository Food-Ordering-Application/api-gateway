import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RESTAURANT_SERVICE } from 'src/constants';
import { GetMetaDataResponseDto } from './dto';
import { IGetMetaDataResponse } from './interfaces';

@Injectable()
export class MetaService {
  constructor(
    @Inject(RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,
  ) {}

  async getMetaData(): Promise<GetMetaDataResponseDto> {
    const getSomeRestaurantResponse: IGetMetaDataResponse =
      await this.restaurantServiceClient.send('getMetaData', {}).toPromise();
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
}
