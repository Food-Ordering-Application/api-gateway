import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE, DELIVERY_SERVICE, ORDER_SERVICE } from 'src/constants';
import {
  IDeliveryServiceAcceptOrderResponse,
  IDriver,
  IDriverResponse,
  IOrderServiceCompleteOrderResponse,
  IOrderServicePickUpOrderResponse,
} from './interfaces';

@Injectable()
export class DriverService {
  constructor(
    @Inject(USER_SERVICE) private userServiceClient: ClientProxy,
    @Inject(DELIVERY_SERVICE) private deliveryServiceClient: ClientProxy,
    @Inject(ORDER_SERVICE) private orderServiceClient: ClientProxy,
  ) {}

  async acceptOrder(driverId: string, orderId: string) {
    const driverAcceptOrderResponse: IDeliveryServiceAcceptOrderResponse = await this.deliveryServiceClient
      .send('driverAcceptOrder', {
        orderId,
        driverId,
      })
      .toPromise();

    const { status, message } = driverAcceptOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async pickUpOrder(driverId: string, orderId: string) {
    const driverPickUpOrderResponse: IOrderServicePickUpOrderResponse = await this.orderServiceClient
      .send('driverPickedUpOrder', {
        orderId,
        driverId,
      })
      .toPromise();

    const { status, message } = driverPickUpOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async completeOrder(driverId: string, orderId: string) {
    const driverCompleteOrderResponse: IOrderServiceCompleteOrderResponse = await this.orderServiceClient
      .send('driverCompleteOrder', {
        orderId,
        driverId,
      })
      .toPromise();

    const { status, message } = driverCompleteOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async findDriverByPhonenumber(phoneNumber: string): Promise<IDriver> {
    const findDriverByPhonenumberResponse: IDriverResponse = await this.userServiceClient
      .send('findDriverByPhonenumber', phoneNumber)
      .toPromise();
    const { message, status, user } = findDriverByPhonenumberResponse;
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
}
