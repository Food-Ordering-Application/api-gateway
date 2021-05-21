import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../../constants';
import {
  AddPaypalPaymentDto,
  AddPaypalPaymentResponseDto,
  FetchPaymentOfRestaurantResponseDto,
  GetPayPalOnboardStatusResponseDto,
  GetPayPalSignUpLinkDto,
  GetPayPalSignUpLinkResponseDto,
} from './dto';
import {
  IUserServiceAddPaypalPaymentResponse,
  IUserServiceFetchPaymentOfRestaurantResponse,
  IUserServiceGetPayPalOnboardStatusResponse,
  IUserServiceGetPayPalSignUpLinkResponse,
} from './interfaces';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(constants.USER_SERVICE)
    private paymentServiceClient: ClientProxy,
  ) {}

  async addPaypalPayment(
    merchantId: string,
    restaurantId: string,
    addPaypalPaymentDto: AddPaypalPaymentDto,
  ): Promise<AddPaypalPaymentResponseDto> {
    const addPaypalPaymentResponse: IUserServiceAddPaypalPaymentResponse =
      await this.paymentServiceClient
        .send('addPaypalPaymentToRestaurant', {
          merchantId,
          restaurantId,
          data: addPaypalPaymentDto,
        })
        .toPromise();
    const { status, message } = addPaypalPaymentResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }
    return {
      statusCode: status,
      message,
    };
  }

  async fetchPaymentOfRestaurant(
    merchantId: string,
    restaurantId: string,
  ): Promise<FetchPaymentOfRestaurantResponseDto> {
    const fetchPaymentOfRestaurantResponse: IUserServiceFetchPaymentOfRestaurantResponse =
      await this.paymentServiceClient
        .send('fetchPaymentOfRestaurant', {
          merchantId,
          restaurantId,
        })
        .toPromise();

    const { status, message, data } = fetchPaymentOfRestaurantResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }
    return {
      statusCode: 200,
      message,
      data,
    };
  }

  async getPayPalSignUpLink(
    merchantId: string,
    restaurantId: string,
    getPayPalSignUpLinkDto: GetPayPalSignUpLinkDto,
  ): Promise<GetPayPalSignUpLinkResponseDto> {
    const { redirectUrl } = getPayPalSignUpLinkDto;
    const getPayPalSignUpLinkResponse: IUserServiceGetPayPalSignUpLinkResponse =
      await this.paymentServiceClient
        .send('getPayPalSignUpLink', {
          merchantId,
          restaurantId,
          redirectUrl,
        })
        .toPromise();

    const { status, message, data } = getPayPalSignUpLinkResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }
    return {
      statusCode: 200,
      message,
      data,
    };
  }
  async getPayPalOnboardStatus(
    merchantId: string,
    restaurantId: string,
  ): Promise<GetPayPalOnboardStatusResponseDto> {
    const getPayPalSignUpLinkResponse: IUserServiceGetPayPalOnboardStatusResponse =
      await this.paymentServiceClient
        .send('getPayPalOnboardStatus', {
          merchantId,
          restaurantId,
        })
        .toPromise();

    const { status, message, data } = getPayPalSignUpLinkResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }
    return {
      statusCode: 200,
      message,
      data,
    };
  }
}
