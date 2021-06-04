import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE, DELIVERY_SERVICE, ORDER_SERVICE } from 'src/constants';
import { EventPaypalOrderOccurDto } from '../../order/dto';
import { ISimpleResponse } from '../merchant/interfaces';
import {
  ApproveDepositMoneyIntoMainAccountWalletDto,
  ApproveDepositMoneyIntoMainAccountWalletOkResponseDto,
  DepositMoneyIntoMainAccountWalletDto,
  DepositMoneyIntoMainAccountWalletOkResponseDto,
  RegisterDriverCreatedResponseDto,
  RegisterDriverDto,
  WithdrawMoneyToPaypalAccountDto,
  WithdrawMoneyToPaypalAccountOkResponseDto,
} from './dto';
import {
  ICreateDepositMoneyIntoMainAccountWalletResponse,
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
    const { message, status, driver } = findDriverByPhonenumberResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return driver;
  }

  async registerDriver(
    registerDriverDto: RegisterDriverDto,
  ): Promise<RegisterDriverCreatedResponseDto> {
    const registerDriverResponse: IDriverResponse = await this.userServiceClient
      .send('registerDriver', registerDriverDto)
      .toPromise();

    const { message, status, driver } = registerDriverResponse;

    if (status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }
    return {
      statusCode: 201,
      message: message,
      data: {
        driver: driver,
      },
    };
  }

  //! CreateOrder Nạp tiền vào tài khoản chính driver
  async depositMoneyIntoMainAccountWallet(
    driverId: string,
    callerId: string,
    depositMoneyIntoMainAccountWalletDto: DepositMoneyIntoMainAccountWalletDto,
  ): Promise<DepositMoneyIntoMainAccountWalletOkResponseDto> {
    const depositMoneyIntoMainAccountWalletResponse: ICreateDepositMoneyIntoMainAccountWalletResponse = await this.userServiceClient
      .send('depositMoneyIntoMainAccountWallet', {
        ...depositMoneyIntoMainAccountWalletDto,
        callerId,
        driverId,
      })
      .toPromise();

    const {
      message,
      status,
      paypalOrderId,
    } = depositMoneyIntoMainAccountWalletResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message: message,
      data: {
        paypalOrderId,
      },
    };
  }

  //! ApproveOrder Nạp tiền vào tài khoản chính driver
  async approveDepositMoneyIntoMainAccountWallet(
    approveDepositMoneyIntoMainAccountWalletDto: ApproveDepositMoneyIntoMainAccountWalletDto,
    driverId: string,
    callerId: string,
  ): Promise<ApproveDepositMoneyIntoMainAccountWalletOkResponseDto> {
    //TODO:
    const approveDepositMoneyIntoMainAccountWalletResponse: ISimpleResponse = await this.userServiceClient
      .send('approveDepositMoneyIntoMainAccountWallet', {
        ...approveDepositMoneyIntoMainAccountWalletDto,
        driverId,
        callerId,
      })
      .toPromise();

    const {
      message,
      status,
    } = approveDepositMoneyIntoMainAccountWalletResponse;

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
    };
  }

  //! Rút tiền từ ví vào tài khoản paypal của driver
  async withdrawMoneyToPaypalAccount(
    withdrawMoneyToPaypalAccountDto: WithdrawMoneyToPaypalAccountDto,
    driverId: string,
    callerId: string,
  ): Promise<WithdrawMoneyToPaypalAccountOkResponseDto> {
    //TODO:
    const withdrawMoneyToPaypalAccountResponse: ISimpleResponse = await this.userServiceClient
      .send('withdrawMoneyToPaypalAccount', {
        ...withdrawMoneyToPaypalAccountDto,
        driverId,
        callerId,
      })
      .toPromise();

    const { message, status } = withdrawMoneyToPaypalAccountResponse;

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
    };
  }

  async eventPaypalOrderOccur(
    eventPaypalOrderOccurDto: EventPaypalOrderOccurDto,
  ) {
    this.orderServiceClient.emit('eventPaypalOrderOccur', {
      ...eventPaypalOrderOccurDto,
    });
  }
}
