import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateCustomerDto,
  CreateCustomerResponseDto,
  SendPhoneNumberOTPVerifyResponseDto,
  VerifyCustomerPhoneNumberResponseDto,
  FindCustomerByIdResponseDto,
  CreateCustomerAddressDto,
  CreateCustomerAddressResponseDto,
  UpdateCustomerAddressDto,
  DeleteCustomerAddressResponseDto,
  GetListCustomerAddressResponseDto,
} from './dto/index';
import * as constants from '../../constants';
import {
  ICustomer,
  IUserServiceResponse,
  ISimpleResponse,
  ICustomerAddressResponse,
  ICustomerAddressesResponse,
} from './interfaces/index';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {
    const createCustomerResponse: IUserServiceResponse = await this.userServiceClient
      .send('createCustomer', createCustomerDto)
      .toPromise();

    if (createCustomerResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createCustomerResponse.message,
        },
        createCustomerResponse.status,
      );
    }
    return {
      statusCode: 201,
      message: createCustomerResponse.message,
      data: {
        user: createCustomerResponse.user,
      },
    };
  }

  async sendPhoneNumberOTPVerify(
    user: ICustomer,
  ): Promise<SendPhoneNumberOTPVerifyResponseDto> {
    const sendPhoneNumberOTPVerifyResponse: ISimpleResponse = await this.userServiceClient
      .send('sendPhoneNumberOTPVerify', user)
      .toPromise();
    if (sendPhoneNumberOTPVerifyResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: sendPhoneNumberOTPVerifyResponse.message,
        },
        sendPhoneNumberOTPVerifyResponse.status,
      );
    }
    return {
      statusCode: 200,
      message: sendPhoneNumberOTPVerifyResponse.message,
    };
  }

  async verifyCustomerPhoneNumber(
    user: ICustomer,
    otp: string,
  ): Promise<VerifyCustomerPhoneNumberResponseDto> {
    const verifyCustomerPhoneNumberResponse: ISimpleResponse = await this.userServiceClient
      .send('verifyCustomerPhoneNumber', { ...user, otp })
      .toPromise();
    if (verifyCustomerPhoneNumberResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: verifyCustomerPhoneNumberResponse.message,
        },
        verifyCustomerPhoneNumberResponse.status,
      );
    }
    return {
      statusCode: 200,
      message: verifyCustomerPhoneNumberResponse.message,
    };
  }

  async findCustomerByPhoneNumber(phoneNumber: string): Promise<ICustomer> {
    const findCustomerResponse: IUserServiceResponse = await this.userServiceClient
      .send('findCustomerByPhoneNumber', phoneNumber)
      .toPromise();
    if (findCustomerResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: findCustomerResponse.message,
        },
        findCustomerResponse.status,
      );
    }
    return findCustomerResponse.user;
  }

  async findCustomerById(
    customerId: string,
  ): Promise<FindCustomerByIdResponseDto> {
    const findCustomerById: IUserServiceResponse = await this.userServiceClient
      .send('findCustomerById', customerId)
      .toPromise();
    if (findCustomerById.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: findCustomerById.message,
        },
        findCustomerById.status,
      );
    }
    return {
      statusCode: 200,
      message: findCustomerById.message,
      data: {
        user: findCustomerById.user,
      },
    };
  }

  async createCustomerAddress(
    customerId: string,
    createCustomerAddressDto: CreateCustomerAddressDto,
  ): Promise<CreateCustomerAddressResponseDto> {
    const createCustomerAddressResponse: ICustomerAddressResponse = await this.userServiceClient
      .send('createCustomerAddress', {
        customerId,
        ...createCustomerAddressDto,
      })
      .toPromise();

    const { address, message, status } = createCustomerAddressResponse;

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
        customerAddress: address,
      },
    };
  }

  async updateCustomerAddress(
    customerId: string,
    customerAddressId: string,
    updateCustomerAddressDto: UpdateCustomerAddressDto,
  ): Promise<CreateCustomerAddressResponseDto> {
    const updateCustomerAddressResponse: ICustomerAddressResponse = await this.userServiceClient
      .send('updateCustomerAddress', {
        customerId,
        customerAddressId,
        ...updateCustomerAddressDto,
      })
      .toPromise();

    const { address, message, status } = updateCustomerAddressResponse;

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
        customerAddress: address,
      },
    };
  }

  async deleteCustomerAddress(
    customerId: string,
    customerAddressId: string,
  ): Promise<DeleteCustomerAddressResponseDto> {
    const deleteCustomerAddressResponse: ICustomerAddressResponse = await this.userServiceClient
      .send('deleteCustomerAddress', {
        customerId,
        customerAddressId,
      })
      .toPromise();

    const { message, status } = deleteCustomerAddressResponse;

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
    };
  }

  async getListCustomerAddress(
    customerId: string,
  ): Promise<GetListCustomerAddressResponseDto> {
    const getListCustomerAddressResponse: ICustomerAddressesResponse = await this.userServiceClient
      .send('getListCustomerAddress', {
        customerId,
      })
      .toPromise();

    const { message, status, addresses } = getListCustomerAddressResponse;

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
        customerAddresses: addresses,
      },
    };
  }
}
