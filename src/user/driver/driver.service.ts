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
  GetDriverActiveStatusResponseDto,
  GetDriverDailyStatisticOkResponse,
  GetDriverMonthlyStatisticOkResponseDto,
  GetDriverWeeklyStatisticOkResponseDto,
  GetLatestDriverLocationResponseDto,
  GetListAccountTransactionDriverDto,
  GetListAccountTransactionDriverOkResponseDto,
  GetListDriverTransactionHistoryDto,
  GetListDriverTransactionHistoryOkResponseDto,
  GetMainAccountWalletBalanceOkResponseDto,
  RegisterDriverCreatedResponseDto,
  RegisterDriverDto,
  UpdateIsActiveOfDriverDto,
  UpdateIsActiveOfDriverOkResponseDto,
  UpdateLocationDto,
  WithdrawMoneyToPaypalAccountDto,
  WithdrawMoneyToPaypalAccountOkResponseDto,
} from './dto';
import { GetDriverInformationOkResponseDto } from './dto/get-driver-information/get-driver-information-ok-response.dto';
import {
  IAccountTransactionsReponse,
  IAccountWalletResponse,
  ICreateDepositMoneyIntoMainAccountWalletResponse,
  IDeliveryServiceAcceptOrderResponse,
  IDeliveryServiceDeclineOrderResponse,
  IDriver,
  IDriverDailyStatisticResponse,
  IDriverResponse,
  IDriverStatisticResponse,
  IDriverTransactionsResponse,
  IGetDriverActiveStatusResponse,
  IGetDriverInformationResponse,
  IGetLatestDriverLocationResponse,
  IIsActiveResponse,
  IMainBalanceResponse,
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

  async declineOrder(driverId: string, orderId: string) {
    const driverDeclineOrderResponse: IDeliveryServiceDeclineOrderResponse = await this.deliveryServiceClient
      .send('driverDeclineOrder', {
        orderId,
        driverId,
      })
      .toPromise();

    const { status, message } = driverDeclineOrderResponse;

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
    const approveDepositMoneyIntoMainAccountWalletResponse: IMainBalanceResponse = await this.userServiceClient
      .send('approveDepositMoneyIntoMainAccountWallet', {
        ...approveDepositMoneyIntoMainAccountWalletDto,
        driverId,
        callerId,
      })
      .toPromise();

    const {
      message,
      status,
      mainBalance,
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
      data: {
        mainBalance: mainBalance,
      },
    };
  }

  //! Rút tiền từ ví vào tài khoản paypal của driver
  async withdrawMoneyToPaypalAccount(
    withdrawMoneyToPaypalAccountDto: WithdrawMoneyToPaypalAccountDto,
    driverId: string,
    callerId: string,
  ): Promise<WithdrawMoneyToPaypalAccountOkResponseDto> {
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
    this.userServiceClient.emit('eventPaypalOrderOccur', {
      ...eventPaypalOrderOccurDto,
    });
  }

  //! Lấy danh sách lịch sử giao dịch (nạp,rút) tiền của driver
  async getListDriverTransactionHistory(
    driverId: string,
    callerId: string,
    getListDriverTransactionHistoryDto: GetListDriverTransactionHistoryDto,
  ): Promise<GetListDriverTransactionHistoryOkResponseDto> {
    const getListDriverTransactionHistoryResponse: IDriverTransactionsResponse = await this.userServiceClient
      .send('getListDriverTransactionHistory', {
        ...getListDriverTransactionHistoryDto,
        driverId,
        callerId,
      })
      .toPromise();

    const {
      message,
      status,
      driverTransactions,
    } = getListDriverTransactionHistoryResponse;

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
        driverTransactions: driverTransactions,
      },
    };
  }

  //! Lấy danh sách lịch sử giao dịch trừ cộng tiền hệ thống của driver
  async getListAccountTransactionDriver(
    driverId: string,
    callerId: string,
    getListAccountTransactionDriverDto: GetListAccountTransactionDriverDto,
  ): Promise<GetListAccountTransactionDriverOkResponseDto> {
    const getListAccountTransactionDriverResponse: IAccountTransactionsReponse = await this.userServiceClient
      .send('getListAccountTransactionDriver', {
        ...getListAccountTransactionDriverDto,
        driverId,
        callerId,
      })
      .toPromise();

    const {
      message,
      status,
      accountTransactions,
    } = getListAccountTransactionDriverResponse;

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
        accountTransactions: accountTransactions,
      },
    };
  }

  //! Lấy thông tin balance của tài khoản chính
  async getMainAccountWalletBalance(
    driverId: string,
    callerId: string,
  ): Promise<GetMainAccountWalletBalanceOkResponseDto> {
    const getMainAccountWalletBalanceResponse: IAccountWalletResponse = await this.userServiceClient
      .send('getMainAccountWalletBalance', {
        driverId,
        callerId,
      })
      .toPromise();

    const {
      message,
      status,
      accountWallet,
    } = getMainAccountWalletBalanceResponse;

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
        accountWallet: accountWallet,
      },
    };
  }

  async updateIsActiveOfDriver(
    driverId: string,
    updateIsActiveOfDriverDto: UpdateIsActiveOfDriverDto,
  ): Promise<UpdateIsActiveOfDriverOkResponseDto> {
    const updateIsActiveOfDriverResponse: IIsActiveResponse = await this.deliveryServiceClient
      .send('updateDriverActiveStatus', {
        driverId,
        ...updateIsActiveOfDriverDto,
      })
      .toPromise();

    const { message, status } = updateIsActiveOfDriverResponse;

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

  async getDriverActiveStatus(
    driverId: string,
  ): Promise<GetDriverActiveStatusResponseDto> {
    const getDriverActiveStatusResponse: IGetDriverActiveStatusResponse = await this.deliveryServiceClient
      .send('getDriverActiveStatus', {
        driverId,
      })
      .toPromise();

    const { message, status, data } = getDriverActiveStatusResponse;

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
      data,
    };
  }

  async updateDriverLocation(
    driverId: string,
    updateDriverLocationDto: UpdateLocationDto,
  ): Promise<GetDriverActiveStatusResponseDto> {
    this.deliveryServiceClient.emit('updateDriverLocation', {
      driverId,
      ...updateDriverLocationDto,
    });

    return {
      statusCode: 200,
      message: 'Update location successfully',
    };
  }

  //! Api thống kê theo ngày
  async getDriverDailyStatistic(
    driverId: string,
    callerId: string,
  ): Promise<GetDriverDailyStatisticOkResponse> {
    //TODO:
    const getDriverDailyStatisticResponse: IDriverDailyStatisticResponse = await this.userServiceClient
      .send('getDriverDailyStatistic', {
        driverId,
        callerId,
      })
      .toPromise();

    const { message, status, statistic } = getDriverDailyStatisticResponse;

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
        statistic: statistic,
      },
    };
  }

  //! Api thống kê theo tuần
  async getDriverWeeklyStatistic(
    driverId: string,
    callerId: string,
  ): Promise<GetDriverWeeklyStatisticOkResponseDto> {
    //TODO:
    const getDriverWeeklyStatisticResponse: IDriverStatisticResponse = await this.userServiceClient
      .send('getDriverWeeklyStatistic', {
        driverId,
        callerId,
      })
      .toPromise();

    const { message, status, statistic } = getDriverWeeklyStatisticResponse;

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
        statistic: statistic,
      },
    };
  }

  //! Api thống kê theo tháng
  async getDriverMonthlyStatistic(
    driverId: string,
    callerId: string,
  ): Promise<GetDriverMonthlyStatisticOkResponseDto> {
    //TODO:
    const getDriverMonthlyStatisticResponse: IDriverStatisticResponse = await this.userServiceClient
      .send('getDriverMonthlyStatistic', {
        driverId,
        callerId,
      })
      .toPromise();

    const { message, status, statistic } = getDriverMonthlyStatisticResponse;

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
        statistic: statistic,
      },
    };
  }

  //! Test locking route 1
  async testUpdateAccountWallet(driverId: string, callerId: string) {
    //TODO:
    const getMainAccountWalletBalanceResponse: IAccountWalletResponse = await this.userServiceClient
      .send('testUpdateAccountWallet', {
        driverId,
        callerId,
      })
      .toPromise();

    const {
      message,
      status,
      accountWallet,
    } = getMainAccountWalletBalanceResponse;

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
        accountWallet: accountWallet,
      },
    };
  }
  //! Test locking route 2
  async testGetAccountWallet(driverId: string, callerId: string) {
    //TODO:
    const testGetAccountWalletResponse: IAccountWalletResponse = await this.userServiceClient
      .send('testGetAccountWallet', {
        driverId,
        callerId,
      })
      .toPromise();

    const { message, status, accountWallet } = testGetAccountWalletResponse;

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
        accountWallet: accountWallet,
      },
    };
  }

  async getLatestLocationOfDriver(
    driverId: string,
  ): Promise<GetLatestDriverLocationResponseDto> {
    const getLatestDriverLocationResponse: IGetLatestDriverLocationResponse = await this.deliveryServiceClient
      .send('getLatestDriverLocation', {
        driverId,
      })
      .toPromise();
    const { message, status, data } = getLatestDriverLocationResponse;

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
      data,
    };
  }

  async getDriverInformation(
    driverId: string,
  ): Promise<GetDriverInformationOkResponseDto> {
    const getDriverInformationResponse: IGetDriverInformationResponse = await this.userServiceClient
      .send('getDriverInformation', {
        driverId,
      })
      .toPromise();

    const { message, status, driver } = getDriverInformationResponse;

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
      data: { driverInfo: driver },
    };
  }
}
